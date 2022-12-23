<script lang="ts">
	import { Transition } from '@rgossiaux/svelte-headlessui';
	import { Icon, ChevronDown } from 'svelte-hero-icons';

	export let name: string;
	export let value: { name: string; id: string } = { name: '', id: '' };
	export let options: { name: string; id: string }[];
	export let search: string;

	let open = false;
	let active_option = '';

	const options_map = Object.assign({}, ...options.map((el) => ({ [el.name]: el.id })));
	$: searched_options = options.filter((el) => el.name.startsWith(search));
	$: if (value.name !== search) value = { name: '', id: '' };
	$: if (options_map[search] !== undefined) value = { name: search, id: options_map[search] };

	function on_click(option: { name: string; id: string }) {
		return () => {
			value = option;
			search = option.name;
			active_option = '';
			open = false;
		};
	}
</script>

<div class="w-full">
	<div class="relative mt-1">
		<input
			on:focus={() => (open = true)}
			on:focusout={() => (active_option === '' ? (open = false) : undefined)}
			bind:value={search}
			id={name}
			type="text"
			class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-12 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
			role="combobox"
			aria-controls="options"
			aria-expanded="false"
		/>
		<button
			type="button"
			class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
			on:click={() => (open = true)}
		>
			<Icon src={ChevronDown} size="24" class="text-gray-400" />
		</button>
		<Transition
			show={open}
			leave="transition ease-in duration-100"
			leaveFrom="opacity-100"
			leaveTo="opacity-0"
		>
			<ul
				class="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
			>
				{#each searched_options as option (option)}
					<li>
						<button
							class={'relative w-full h-full text-left py-2 pl-3 pr-9 cursor-default select-none ' +
								(active_option === option.name ? 'text-white bg-purple-400 ' : 'text-gray-900 ') +
								(value.name === option.name ? 'font-semibold' : 'font-normal')}
							value={option}
							on:mouseenter={() => (active_option = option.name)}
							on:mouseleave={() =>
								active_option === option.name ? (active_option = '') : undefined}
							on:click={on_click(option)}
						>
							<span class="block truncate">
								{option.name}
							</span>
						</button>
					</li>
				{/each}
			</ul>
		</Transition>
	</div>
</div>

<!--
<div>
	<label for={name} class="block text-sm font-medium text-gray-700">{name.toUpperCase()}</label>
	<div class="relative mt-1">

		<ul
			class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
			id="options"
			role="listbox"
		>
			{#each options as option}
				<li
					class="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900"
					id="option-0"
					role="option"
					tabindex="-1"
					aria-selected={option === value}
				>
					<span class={'block truncate ' + (option === value ? 'font-semibold' : '')}>
						{option}
					</span>

					<span class="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
						<Icon src={Check} size="5" aria-hidden="true" />
					</span>
				</li>
			{/each}
		</ul>
	</div>
</div>
-->
