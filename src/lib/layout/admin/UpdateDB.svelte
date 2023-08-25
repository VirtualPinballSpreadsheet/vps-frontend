<script>
	import HelpIcon from '$lib/components/HelpIcon.svelte';
	import { formatDate } from '$lib/helper/formatDate';
</script>

<div class="flex flex-col gap-4">
	<HelpIcon>
		<h4 class="h4">Update DB</h4>
		<p slot="help">Publish the current state of the database.</p>
	</HelpIcon>
	<p>Last updated: {formatDate(new Date().getTime())}</p>
	<button class="btn variant-filled-primary">Update DB</button>
</div>
