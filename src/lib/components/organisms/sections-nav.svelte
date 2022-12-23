<script lang="ts">
	import { sections } from '$lib/stores/sections';
	import { current_section_write, current_section_read } from '$lib/stores/pagestate';
</script>

<nav class="bg-white shadow flex flex-row items-center">
	<div class="overflow-x-scroll mr-16 sm:ml-16 ml-2 no-scrollbar">
		<div class="flex h-16 justify-between">
			<div class="flex">
				<div class="flex space-x-8">
					{#each $sections as section}
						<button
							class={'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium w-max ' +
								($current_section_read === section.id
									? 'border-purple-300 text-gray-900'
									: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700')}
							on:click={() => ($current_section_write = section.id)}
						>
							{section.value}
						</button>
					{/each}
				</div>
			</div>
		</div>
	</div>
</nav>

<style>
	/* Hide scrollbar for Chrome, Safari and Opera */
	.no-scrollbar::-webkit-scrollbar {
		display: none;
	}

	/* Hide scrollbar for IE, Edge and Firefox */
	.no-scrollbar {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}
</style>
