<script lang="ts">
	import { DialogTitle } from '@rgossiaux/svelte-headlessui';
	import { createEventDispatcher } from 'svelte';

	import Select from '../atoms/select.svelte';
	import { elements, type content_type } from '../elements/all_elements';
	import { content } from '$lib/stores/content';
	import { sections } from '$lib/stores/sections';
	import { current_section_read } from '$lib/stores/pagestate';
	import uuid from '$lib/core/uuid';
	import Textbox from '../atoms/textbox.svelte';
	import Textarea from '../atoms/textarea.svelte';
	import NumberInput from '../atoms/number-input.svelte';
	import { get_all_options } from '$lib/core/utils';
	import ComboboxList from './combobox-list.svelte';
	import { points } from '$lib/stores/points';
	import { variables } from '$lib/stores/variables';

	type possible_states = 'addbefore' | 'addafter' | 'edit';
	export let edit_state: { state: possible_states; id: string };

	const dispatch = createEventDispatcher();
	let result: { [prop: string]: any } =
		edit_state.state === 'edit'
			? { ...$content[$current_section_read].filter((el) => el.id === edit_state.id)[0] }
			: {
					template: 'checkbox',
					id: uuid()
			  };
	$: props = Object.keys(elements[result.template][0].props).map((el) => ({
		name: el,
		type: elements[result.template][0].props[el]
	}));

	function on_apply() {
		for (let prop of props) if (result[prop.name] === undefined) return;
		if (edit_state.state === 'addbefore')
			content.add_above($current_section_read, edit_state.id, result as content_type);
		else if (edit_state.state === 'addafter')
			content.add_below($current_section_read, edit_state.id, result as content_type);
		else content.change($current_section_read, edit_state.id, result as content_type);
		dispatch('close');
	}

	function on_delete() {
		content.delete($current_section_read, edit_state.id);
		dispatch('close');
	}

	function reset_result() {
		result = { template: result.template, id: result.id };
	}
</script>

<div
	class="relative transform rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all w-full max-w-lg"
>
	<div>
		<div class="mt-3 text-center">
			<DialogTitle as="h1" class="text-3xl font-medium leading-6 text-gray-900">
				Edit Element
			</DialogTitle>
			<div class="mt-2 text-left">
				<h1 class="text-xl">Template</h1>
				<span class="text-sm leading-tight text-gray-400 block mb-4">
					This is the template that the element will follow. To add more templates, you can go to
					/src/lib/components/elements and follow directions within all_elements.ts
				</span>
				<Select
					bind:value={result.template}
					on:change={reset_result}
					options={Object.keys(elements)}
					name="Template"
				/>
			</div>
			{#each props as prop}
				<div class="mt-2 text-left">
					{#if prop.type === 'string'}
						<Textbox name={prop.name} bind:value={result[prop.name]} />
					{:else if prop.type === 'long_string'}
						<Textarea name={prop.name} bind:value={result[prop.name]} />
					{:else if prop.type === 'number'}
						<NumberInput name={prop.name} bind:value={result[prop.name]} />
					{:else if prop.type === 'option_list'}
						<ComboboxList
							name={prop.name}
							bind:value={result[prop.name]}
							options={get_all_options($sections, $content)}
							edit_type="no"
						/>
					{:else if prop.type === 'point_cost'}
						<ComboboxList
							name={prop.name}
							bind:value={result[prop.name]}
							options={$points.slice(1).map((el) => ({ name: el.value, id: el.id }))}
							edit_type="number"
						/>
					{:else if prop.type === 'variable_cost'}
						<ComboboxList
							name={prop.name}
							bind:value={result[prop.name]}
							options={$variables.map((el) => ({ name: el.value, id: el.id }))}
							edit_type="number"
						/>
					{:else if prop.type === 'variable_dep'}
						<ComboboxList
							name={prop.name}
							bind:value={result[prop.name]}
							options={$variables.map((el) => ({ name: el.value, id: el.id }))}
							edit_type="string"
						/>
					{:else if prop.type === 'option_effect'}
						<ComboboxList
							name={prop.name}
							bind:value={result[prop.name]}
							options={get_all_options($sections, $content)}
							edit_type="string"
						/>
					{/if}
				</div>
			{/each}
			<button
				type="button"
				class="inline-flex w-full justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 mr-2 mt-4"
				on:click={on_delete}
			>
				Delete
			</button>
		</div>
	</div>
	<div class="flex flex-row mt-5">
		<button
			type="button"
			class="inline-flex w-full justify-center rounded-md border border-transparent bg-slate-400 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 mr-2"
			on:click={() => dispatch('close')}
		>
			Cancel
		</button>
		<button
			type="button"
			class="inline-flex w-full justify-center rounded-md border border-transparent bg-purple-400 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 ml-2"
			on:click={on_apply}
		>
			Apply
		</button>
	</div>
</div>
