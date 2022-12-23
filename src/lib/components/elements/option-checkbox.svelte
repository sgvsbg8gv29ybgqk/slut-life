<script lang="ts">
	import { Icon, Heart } from 'svelte-hero-icons';

	import { default_option_state, gamestate } from '$lib/stores/gamestate';
	import BaseOption from '../atoms/base-option.svelte';
	import { calc_point_mods, test_variables } from '$lib/core/utils';

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
	export let variable_costs: [string, number][];
	variable_costs;
	export let cost_effect: [string, string][];
	cost_effect;

	$: state = $gamestate.option_states[id] || default_option_state();
	$: disabled =
		state.value === 0 &&
		(state.num_conflict > 0 ||
			state.num_dependency < dependencies.length ||
			!test_variables($gamestate, variable_dependencies));
	$: act_cost = calc_point_mods(state.point_mods, cost);

	function on_click() {
		gamestate.update_option_state(id, state, {
			...state,
			state: !state.state,
			value: +!state.state
		});
	}
</script>

<BaseOption {name} {content} cost={act_cost} {disabled} {conflicts} {dependencies}>
	<button on:click={on_click} {disabled}>
		<Icon
			class={'m-0.5 [&>path]:stroke-1 ' + (state.state ? 'fill-rose-400 stroke-rose-400' : '')}
			src={Heart}
			size="28"
		/>
	</button>
</BaseOption>
