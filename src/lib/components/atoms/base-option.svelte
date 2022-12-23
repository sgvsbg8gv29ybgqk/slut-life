<script lang="ts">
	import PointCost from './point-cost.svelte';

	export let name: string;
	export let content: string;
	export let cost: number;
	export let disabled: boolean = false;
</script>

<div class={disabled ? 'text-gray-400' : ''}>
	<div class={'flex flex-row items-center '}>
		<slot />
		<h1 class="text-2xl">{name}</h1>
		<PointCost {cost} {disabled} />
	</div>
	<div class="ml-4 mt-2">
		<span class="whitespace-pre-line">{content}</span>
	</div>
</div>
