<script lang="ts">
	import {
		Listbox,
		ListboxButton,
		ListboxLabel,
		ListboxOption,
		ListboxOptions,
		Transition
	} from '@rgossiaux/svelte-headlessui';
	import { createEventDispatcher } from 'svelte';
	import { Icon, ChevronDown } from 'svelte-hero-icons';

	export let name: string;
	export let value: string;
	export let options: string[];

	const dispatch = createEventDispatcher();

	function on_change(event: CustomEvent<string>) {
		value = event.detail;
		dispatch('change');
	}
</script>

<Listbox {value} on:change={on_change} let:open>
	<ListboxLabel class="block text-sm font-medium text-gray-700">{name.toUpperCase()}</ListboxLabel>
	<div class="relative mt-1">
		<ListboxButton
			class="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-purple-300 focus:outline-none focus:ring-1 focus:ring-purple-300 sm:text-sm"
		>
			<span class="block truncate">{value}</span>
			<span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
				<Icon src={ChevronDown} class="h-5 w-5 text-gray-400" aria-hidden="true" />
			</span>
		</ListboxButton>
		<Transition
			show={open}
			leave="transition ease-in duration-100"
			leaveFrom="opacity-100"
			leaveTo="opacity-0"
		>
			<ListboxOptions
				static
				class="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
			>
				{#each options as option (option)}
					<ListboxOption
						value={option}
						class={({ active, selected }) =>
							'relative cursor-default select-none py-2 pl-3 pr-9 ' +
							(active ? 'text-white bg-purple-400 ' : 'text-gray-900 ') +
							(selected ? 'font-semibold' : 'font-normal')}
					>
						<span class="block truncate">
							{option}
						</span>
					</ListboxOption>
				{/each}
			</ListboxOptions>
		</Transition>
	</div>
</Listbox>
