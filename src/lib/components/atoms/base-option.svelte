<script lang="ts">
	import { name_map } from '$lib/stores/content';

	import PointCost from './point-cost.svelte';

	export let name: string;
	export let content: string;
	export let cost: number;
	export let disabled: boolean = false;
	export let dependencies: string[] = [];
	export let conflicts: string[] = [];

	$: act_dependencies = dependencies.map((el) => $name_map[el]);
	$: act_conflicts = conflicts.map((el) => $name_map[el]);
</script>

<div class={disabled ? 'text-gray-400' : ''}>
	<div class={'flex flex-row items-center '}>
		<slot />
		<h1 class="text-2xl">{name}</h1>
		<PointCost {cost} {disabled} />
	</div>
	{#if act_dependencies.length > 0}
		<div class="ml-4">
			{#each act_dependencies as dependency}
				<span class="text-xs">Requires: {dependency}</span>
			{/each}
		</div>
	{/if}
	{#if act_conflicts.length > 0}
		<div class="ml-4">
			{#each act_conflicts as conflict}
				<span class="text-xs">Conflict: {conflict}</span>
			{/each}
		</div>
	{/if}
	<div class="ml-4 mt-2">
		<span class="whitespace-pre-line">{content}</span>
	</div>
</div>
