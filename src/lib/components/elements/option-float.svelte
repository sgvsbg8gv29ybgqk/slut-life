<script lang="ts">
	import { gamestate } from '$lib/stores/gamestate';
	import BaseOption from '../atoms/base-option.svelte';
	import NumberInput from '../atoms/number-input.svelte';

	export let template: string;
	template;
	export let id: string;
	id;
	export let name: string;
	export let content: string;
	export let minimum: number;
	export let maximum: number;

	$: state = $gamestate.option_states[id] || { value: minimum };
	let value = (state || { value: minimum }).value;

	function on_change() {
		$gamestate.option_states[id] = { value };
	}
</script>

<BaseOption {name} {content} cost={0}>
	<div class="w-16 mr-2">
		<NumberInput name="" {minimum} {maximum} bind:value on:change={() => on_change()} />
	</div>
</BaseOption>
