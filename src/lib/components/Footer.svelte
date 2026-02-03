<script>
	import VPC from './VPC.svelte';

	const getData = async () => {
		const res = await fetch(
			'https://virtualpinballchat.com/vpc/api/v1/currentWeek?channelName=competition-corner'
		);
		const data = await res.json();
		return data;
	};
	let promise = getData();
</script>

<div class="min-h-96 bg-surface-100 dark:bg-surface-600 -m-10 flex justify-center">
	<div class="max-w-screen-2xl w-full">
		{#await promise}
			Loading VPC Weekly challenge...
		{:then data}
			<VPC {data} />
		{:catch someError}
			Theres been an error fetching the VPC weekly challenge SpeechRecognitionResultList.
		{/await}
	</div>
</div>
