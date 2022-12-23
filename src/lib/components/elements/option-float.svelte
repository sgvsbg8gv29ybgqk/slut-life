<script lang="ts">
	import { type option_state_type, gamestate, default_option_state } from '$lib/stores/gamestate';
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

	let state: option_state_type;
	$: {
		state = $gamestate.option_states[id] || default_option_state();
		if (typeof state.value === 'boolean') state.value = minimum;
	}

	function on_change() {
		$gamestate.option_states[id] = { ...state, state: state.value };
	}
</script>

<BaseOption {name} {content} cost={0}>
	<div class="w-16 mr-2">
		<NumberInput
			name=""
			{minimum}
			{maximum}
			bind:value={state.value}
			on:change={() => on_change()}
		/>
	</div>
</BaseOption>
