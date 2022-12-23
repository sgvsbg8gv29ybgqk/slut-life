<script lang="ts">
	import { Icon, Cog } from 'svelte-hero-icons';

	import { current_content } from '$lib/stores/content';
	import { scroll_pos } from '$lib/stores/pagestate';
	import { sections } from '$lib/stores/sections';
	import { gamestate } from '$lib/stores/gamestate';
	import { points } from '$lib/stores/points';

	import SectionsNav from '../organisms/sections-nav.svelte';
	import ElementList from '../organisms/element-list.svelte';

	$: all_points = $points.map((el) => ({
		name: el.value,
		value: $gamestate.points[el.id] || 0
	}));
</script>

<svelte:window bind:scrollY={$scroll_pos} />
{#if $sections.length > 1}
	<SectionsNav />
{/if}
<div class="flex flex-row items-start w-screen mt-6">
	<a class="fixed right-4 top-4" href="/settings" aria-label="Settings navigation">
		<Icon class="[&>path]:stroke-1" src={Cog} size="32" />
	</a>
	<div class="p-2 sm:mx-10 grow mb-16">
		<ElementList contents={$current_content || []} />
	</div>
</div>
<div
	class="h-16 bg-white fixed bottom-0 w-full border-purple-200 border flex flex-row items-center justify-center"
>
	{#each all_points as { name, value }}
		<span class="text-2xl font-extralight mx-16">{name}: {value}</span>
	{/each}
</div>
