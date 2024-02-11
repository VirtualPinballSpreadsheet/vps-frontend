<script lang="ts">
	export let val: string;
	export let onDelete = (e: any) => {};
	export let onEdit = (v: string) => {};
	let edit = false;
</script>

<button
	type="button"
	class="chip variant-filled-primary"
	draggable={!edit}
	on:click
	on:keypress
	on:keydown
	on:keyup
	on:dragstart
>
	{#if edit}
		<input type="text" class="input text-xs p-1 -m-1" bind:value={val} />
		<span
			on:click={() => {
				onEdit(val);
				edit = false;
			}}>✓</span
		>
	{:else}
		<span
			on:click|stopPropagation={() => {
				edit = true;
			}}>{val}</span
		>
		<span on:click={onDelete}>✕</span>
	{/if}
</button>
