<script lang="ts">
	import Cropper from 'svelte-easy-crop';
	import Placeholder from '$lib/assets/img/bgPlaceholder.jpg';
	import { FileButton, ProgressRadial, getToastStore } from '@skeletonlabs/skeleton';
	import { getCroppedImg, compress } from '$lib/helper/canvasUtils';
	import { User } from '$lib/stores/UserStore';
	const toastStore = getToastStore();

	export let placeholder = Placeholder;
	export let imgUrl = Placeholder;
	export let name = '';
	export let onChange = (url: string) => {};
	export let aspect = 9 / 16;

	let files: FileList;
	let active = false;
	let pixels: any;
	let image = Placeholder;
	let crop = { x: 0, y: 0 };
	let zoom = 1;
	let el: Element;
	let loading = false;

	let croppedImage: any;

	const onCrop = (e: any) => {
		pixels = e.detail.pixels;
	};

	const _onChange = (e: any) => {
		if (!e.target?.files?.length) return;
		let imageFile = e.target.files[0];
		let reader = new FileReader();
		reader.onload = (e) => {
			image = e.target?.result as string;
			active = true;
		};
		reader.readAsDataURL(imageFile);
	};

	const onCancel = () => {
		active = false;
	};

	const onSave = async () => {
		loading = true;
		const [_file, _blob] = await getCroppedImg(image, pixels);
		const [file, blob] = await compress(_blob);
		const res = await User.uploadImage(file, name);
		if (!res) {
			toastStore.trigger({
				message: 'Image upload failed',
				background: 'variant-filled-error'
			});
			loading = false;
			return;
		}
		croppedImage = blob;
		active = false;
		toastStore.trigger({
			message: 'Image Upload successful',
			background: 'variant-filled-success'
		});
		onChange(res);
		loading = false;
	};
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="w-full flex flex-col gap-4">
	<div bind:this={el} class="w-full h-full relative" style:aspect-ratio={aspect}>
		{#if loading}
			<div
				class="absolute top-0 left-0 right-0 bottom-0 bg-gray-950/60 flex items-center justify-center z-50"
			>
				<ProgressRadial stroke={60} meter="stroke-primary-500" track="stroke-primary-500/30" />
			</div>
		{/if}
		{#if active}
			<Cropper
				{image}
				maxZoom={100}
				zoomSpeed={0.1}
				bind:crop
				bind:zoom
				on:cropcomplete={onCrop}
				{aspect}
			/>
		{:else}
			<img
				alt="upload preview"
				src={croppedImage || imgUrl || placeholder}
				class="w-full rounded object-cover"
				style:aspect-ratio={aspect}
			/>
		{/if}
	</div>
	{#if active}
		<div class="flex gap-4">
			<button class="btn variant-filled-primary flex-1" on:click={onSave} disabled={loading}
				>Save</button
			>
			<button class="btn variant-ghost-secondary flex-1" on:click={onCancel} disabled={loading}
				>Cancel</button
			>
		</div>
	{:else}
		<FileButton
			name="image"
			bind:files
			on:change={_onChange}
			button="btn variant-filled-secondary"
			disabled={loading}>Upload Image</FileButton
		>
	{/if}
</div>
