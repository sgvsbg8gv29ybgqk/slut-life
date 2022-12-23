<script lang="ts">
	export let cost: number;
	export let disabled: boolean = false;
</script>

<span
	class={'ml-1 text-lg ' +
		(cost > 0
			? disabled
				? 'text-green-300'
				: 'text-green-500'
			: cost < 0
			? disabled
				? 'text-red-300'
				: 'text-red-500'
			: 'invisible')}
>
	{cost}
</span>
