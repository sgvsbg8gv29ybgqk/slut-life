<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let name: string;
	export let value: number = 0;
	export let minimum: number = -Infinity;
	export let maximum: number = Infinity;

	const dispatch = createEventDispatcher();
	function on_change(event: { currentTarget: HTMLInputElement }) {
		const currentValue = parseFloat(event.currentTarget.value);
		if (currentValue < minimum) value = minimum;
		else if (currentValue > maximum) value = maximum;
		else value = currentValue;
		dispatch('change');
	}
</script>

<div>
	<label for={name} class="block text-sm font-medium text-gray-700">{name.toUpperCase()}</label>
	<div class="mt-1">
		<input
			{value}
			on:change={on_change}
			{name}
			id={name}
			type="number"
			class="block w-full rounded-md border border-solid border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
			placeholder={name}
			min={minimum}
			max={maximum}
		/>
	</div>
</div>
