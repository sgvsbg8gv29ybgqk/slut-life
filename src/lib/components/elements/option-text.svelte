<script lang="ts">
	import BaseOption from '../atoms/base-option.svelte';
	import Combobox from '../atoms/combobox.svelte';

	export let template: string;
	template;
	export let id: string;
	id;
	export let name: string;
	export let content: string;
	export let options: string;

	const actual_options = options
		.split(',')
		.map((el) => el.trim())
		.map((el) => ({ name: el, id: el }));
	let value: { name: ''; id: '' };
	let search: string;
</script>

<BaseOption {name} {content} cost={0}>
	<div class="w-32 mr-2">
		<Combobox name="" bind:value options={actual_options} {search} />
	</div>
</BaseOption>
