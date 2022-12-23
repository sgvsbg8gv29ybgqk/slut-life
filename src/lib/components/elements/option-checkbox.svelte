<script lang="ts">
	import { Icon, Heart } from 'svelte-hero-icons';

	import { gamestate } from '$lib/stores/gamestate';
	import BaseOption from '../atoms/base-option.svelte';

	export let template: string;
	template;
	export let id: string;
	export let name: string;
	export let content: string;
	export let cost: number;
	export let dependencies: string[];
	export let conflicts: string[];
	export let point_costs: [string, number][];
	point_costs;
	export let variable_dependencies: [string, string][];
	variable_dependencies;
	export let variable_costs: [string, number][];
	variable_costs;
	export let cost_effect: [string, string][];
	cost_effect;

	$: state = $gamestate.option_states[id] || {
		state: false,
		value: 0,
		disabled: false,
		point_mods: [],
		given_points: 0
	};

	function on_click() {
		gamestate.update_option_state(id, state, {
			state: !state.state,
			value: +state.state,
			...state
		});
	}
</script>

<BaseOption {name} {content} {cost} disabled={state.disabled}>
	<button on:click={on_click} disabled={state.disabled}>
		<Icon
			class={'m-0.5 [&>path]:stroke-1 ' + (state.state ? 'fill-rose-400 stroke-rose-400' : '')}
			src={Heart}
			size="28"
		/>
	</button>
</BaseOption>
