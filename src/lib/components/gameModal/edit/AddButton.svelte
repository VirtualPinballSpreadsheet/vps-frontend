<script lang="ts">
	import type { FileUpload } from '$lib/types/VPin';
	import { faAdd } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { nanoid } from 'nanoid';
	import { Paste } from '$lib/helper/paste';

	export let files: FileUpload[] | undefined;
	export let paste: Paste | undefined;
	export let title = '???';
	export let open = false;
</script>

<button
class="btn variant-ghost-tertiary self-end gap-4"
on:click={() => {
    if (!files) files = [];
    //@ts-ignore
    files.unshift({
        id: nanoid(10),
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime()
    });
    files = files;
    open = true;
}}><Fa icon={faAdd} /> Add new {title}</button
>

<button
class="btn variant-ghost-tertiary self-end gap-4"
on:click={() => {
    if (!files) files = [];
    navigator.clipboard.readText().then(
        (clipText) => {
            const p = paste || new Paste();
            const n = p.newFromPaste(clipText);
            if (n) {
                for (const item of n) {
                    files?.unshift(item);
                }
            }
            open = true;
        }
    )
}}><Fa icon={faAdd} /> New from paste</button
>
