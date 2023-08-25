import { firebaseAuth } from './FirebaseStore';
import { GithubAuthProvider, signInWithPopup, signOut, type User as FBUser } from 'firebase/auth';
import { localStorageStore } from '@skeletonlabs/skeleton';
import { get, type Writable } from 'svelte/store';
import type { UserStore } from '../types/User';
import { DB_GAME_PATH, DB_IMG_PATH, DB_OWNER, DB_REPO } from '../../env';
import type { RequestInterface } from '@octokit/types';
import type { Game } from '$lib/types/VPin';

const userStore: Writable<UserStore> = localStorageStore('user', {});

let octokit: any;

const triggerLoginPopup = () => {
	const provider = new GithubAuthProvider();
	provider.addScope('public_repo');
	provider.setCustomParameters({
		allow_signup: 'false'
	});
	return new Promise((resolve) => {
		signInWithPopup(firebaseAuth, provider)
			.then(async (result) => {
				const credential = GithubAuthProvider.credentialFromResult(result);
				const user = result.user;

				//@ts-ignore not given by firebase somehow....
				user.displayName = result._tokenResponse.screenName;
				if (!credential?.accessToken) throw new Error();
				resolve(login(credential.accessToken, user));
			})
			.catch((err) => {
				console.error(err);
				resolve(false);
			});
	});
};

const login = async (token: string, user: FBUser) => {
	try {
		//@ts-ignore
		const { Octokit } = (await import('https://esm.sh/octokit')) as Promise<Octokit>;
		const { createOrUpdateTextFile } = await import(
			//@ts-ignore
			'https://esm.sh/@octokit/plugin-create-or-update-text-file'
		);
		const MyOctokit = Octokit.plugin(createOrUpdateTextFile);
		const _octokit = new MyOctokit({ auth: token });
		const res = await _octokit.request(
			'GET /repos/{owner}/{repo}/collaborators/{username}/permission',
			{
				owner: DB_OWNER,
				username: user.displayName,
				repo: DB_REPO
			}
		);
		const permission = res.data.permission as string;
		const admin =
			permission === 'admin' ||
			permission === 'write' ||
			location.hostname === 'localhost' ||
			location.hostname === '127.0.0.1';
		userStore.set({
			user,
			permission,
			token,
			admin
		});
		octokit = _octokit;
		if (location.hostname === 'localhost' || location.hostname === '127.0.0.1')
			window.octokit = _octokit;
		return true;
	} catch (e) {
		console.error(e);
		await logout();
		return false;
	}
};

const logout = () => {
	return new Promise<void>((resolve) => {
		signOut(firebaseAuth).then(() => {
			userStore.set({});
			resolve();
		});
	});
};

const uploadImage = async (file: File, name: string) => {
	const path = `${DB_IMG_PATH}${name}.webp`;
	const buffer = await toBase64(file);
	let sha;
	try {
		// Check if file already exists
		const file = await octokit.request(`GET /repos/{owner}/{repo}/contents/${path}`, {
			owner: DB_OWNER,
			repo: DB_REPO
		});

		sha = file.data.sha;
	} catch (e) {
		// Continue, file doesnt exist
	}
	try {
		const res = await octokit.rest.repos.createOrUpdateFileContents({
			owner: 'VirtualPinballSpreadsheet',
			repo: 'vps-db',
			path,
			sha,
			content: buffer,
			message: `IMAGE:${name} - updated image`
		});
		return `https://virtualpinballspreadsheet.github.io/vps-db/${path}`;
	} catch (e) {
		console.error(e);
		return;
	}
};

const uploadGameFile = async (file: Game) => {
	try {
		const res = await octokit.createOrUpdateTextFile({
			owner: DB_OWNER,
			repo: DB_REPO,
			path: `${DB_GAME_PATH}${file.id}.json`,
			content: JSON.stringify(file),

			message: `GAME:${file.id} - Updated ${file.name}`
		});
		return true;
	} catch (e) {
		console.error(e);
		return false;
	}
};

const toBase64 = (file: File) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = function () {
			const dataUrl = reader.result;
			const base64 = (dataUrl as string).split(',')[1];
			resolve(base64);
		};
		reader.readAsDataURL(file);
	});

// Silent login
(async () => {
	const $userStore = get(userStore);
	const { user, token } = $userStore;
	if (token && user) {
		login(token, user);
	}
})();

export const User = {
	login,
	logout,
	triggerLoginPopup,
	uploadImage,
	uploadGameFile,
	userStore
};
