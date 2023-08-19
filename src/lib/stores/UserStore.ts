import { firebaseAuth } from './FirebaseStore';
import { GithubAuthProvider, signInWithPopup, signOut, type User as FBUser } from 'firebase/auth';
import { localStorageStore, getToastStore } from '@skeletonlabs/skeleton';
import type { Writable } from 'svelte/store';
import type { UserStore } from '../types/User';
import { DB_OWNER, DB_REPO } from '../../env';

const userStore: Writable<UserStore> = localStorageStore('user', {});

let octokit;

const triggerLoginPopup = () => {
	const provider = new GithubAuthProvider();
	provider.addScope('public_repo');
	provider.setCustomParameters({
		allow_signup: 'false'
	});
	signInWithPopup(firebaseAuth, provider)
		.then(async (result) => {
			const credential = GithubAuthProvider.credentialFromResult(result);
			const user = result.user;

			//@ts-ignore not given by firebase somehow....
			user.displayName = result._tokenResponse.screenName;
			if (!credential?.accessToken) throw new Error();
			login(credential.accessToken, user);
		})
		.catch((err) => {
			console.error(err);
		});
};

const login = async (token: string, user: FBUser) => {
	try {
		//@ts-ignore
		const { Octokit } = await import('https://esm.sh/octokit');
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

		if (!admin) {
			getToastStore().trigger({
				message: "You don't have permission to edit on VPS.",
				background: 'variant-filled-error'
			});
			return;
		}

		octokit = _octokit;
		userStore.set({
			user,
			permission,
			token,
			admin
		});
		getToastStore().trigger({
			message: 'Login successfull',
			background: 'variant-filled-success'
		});
	} catch (e) {
		console.log(e);
		getToastStore().trigger({
			message: 'Login was unsuccessfull.',
			background: 'variant-filled-error'
		});
	}
};

const logout = () => {
	signOut(firebaseAuth).then(() => {
		userStore.set({});
		getToastStore().trigger({
			message: 'Logout successfull',
			background: 'variant-filled-success'
		});
	});
};

export const User = {
	login,
	logout,
	triggerLoginPopup,
	userStore
};
