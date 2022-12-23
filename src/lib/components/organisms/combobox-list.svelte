<script lang="ts">
	import { onMount } from 'svelte';
	import Combobox from '../atoms/combobox.svelte';
	import NumberInput from '../atoms/number-input.svelte';
	import Textbox from '../atoms/textbox.svelte';

	export let name: string;
	export let value: any[];
	export let options: { name: string; id: string }[];
	export let edit_type: 'no' | 'number' | 'string';

	onMount(() => {
		if (value === undefined) value = [];
		else value = [...value];
	});

	let number_value: number = 0;
	let string_value: string = '';

	function has_id() {
		if (edit_type === 'no') return value.filter((el) => el === current_value.id).length > 0;
		return value.filter((el) => el[0] === current_value.id).length > 0;
	}

	function on_click() {
		if (current_value.id === '' || has_id()) return;
		if (edit_type === 'string') {
			let x = 0;
			if (typeof eval(string_value) !== 'boolean' && typeof eval(string_value) !== 'number') return;
		}
		if (edit_type === 'no') value.push(current_value.id);
		else if (edit_type === 'number') value.push([current_value.id, number_value]);
		else if (edit_type === 'string') value.push([current_value.id, string_value]);
		value = value;
		search = '';
	}

	function on_remove(id: any) {
		return () => {
			if (edit_type === 'no') value = value.filter((el) => el !== id);
			else value = value.filter((el) => el[0] !== id[0]);
		};
	}

	const name_map = Object.assign({}, ...options.map((el) => ({ [el.id]: el.name })));
	let current_value: { name: string; id: string } = { name: '', id: '' };
	let search: string = '';
</script>

<label for={name} class="block text-sm font-medium text-gray-700">
	{name.toUpperCase()}
</label>
<div class="flex flex-row w-full">
	<Combobox bind:value={current_value} {name} {options} bind:search />
	{#if edit_type === 'number'}
		<div class="ml-2">
			<NumberInput name="" bind:value={number_value} />
		</div>
	{:else if edit_type === 'string'}
		<div class="ml-2">
			<Textbox name="" bind:value={string_value} />
		</div>
	{/if}
	<button
		type="button"
		class="inline-flex justify-center rounded-md border border-transparent bg-purple-400 px-4 py-1 text-base font-medium text-white shadow-sm hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 ml-2 mt-1 w-max"
		on:click={on_click}
	>
		Add
	</button>
</div>
<div class="mt-1">
	{#each value || [] as el}
		<span
			class="inline-flex items-center rounded-full bg-indigo-100 py-0.5 pl-2 pr-0.5 text-xs font-medium text-indigo-700 mr-1"
		>
			{#if edit_type === 'no'}
				{name_map[el]}
			{:else}
				{name_map[el[0]] + ' ' + el[1]}
			{/if}
			<button
				type="button"
				class="ml-0.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none"
				on:click={on_remove(el)}
			>
				<span class="sr-only">Remove small option</span>
				<svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
					<path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" />
				</svg>
			</button>
		</span>
	{/each}
</div>
