<div class="aspect">
	<div
		class="card !bg-surface-100 dark:!bg-surface-600 aspect relative overflow-hidden hover:brightness-125 hover:scale-110 transition-all text-xs md:text-base"
	>
		<div class="p-4 flex flex-col justify-between absolute top-0 left-0 right-0 bottom-0 z-10">
			<span class="placeholder animate-pulse w-30" />
			<div class="flex justify-between max-w-full">
				<span class="placeholder animate-pulse w-20" />
			</div>
		</div>
		<div class="absolute top-0 left-0 right-0 bottom-0 placeholder animate-pulse" />
	</div>
</div>

<style>
	.aspect {
		aspect-ratio: 4/3;
		object-fit: cover;
		height: 100%;
		width: 100%;
	}
</style>
