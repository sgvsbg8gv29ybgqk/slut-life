import { change_state } from '$lib/core/gamestate_mgr';
import { writable } from 'svelte/store';

export type option_state_type = {
	state: any;
	value: number;
	point_mods: string[];
	num_dependency: number;
	num_conflict: number;
};

export const default_option_state = () => ({
	state: false,
	value: 0,
	point_mods: [],
	num_dependency: 0,
	num_conflict: 0
});

export type gamestate_type = {
	option_states: {
		[id: string]: option_state_type;
	};
	points: {
		[id: string]: number;
	};
	variables: {
		[id: string]: number;
	};
};

const default_gamestate = {
	option_states: {},
	points: {},
	variables: {}
};

function create_gamestate() {
	const { subscribe, set, update } = writable<gamestate_type>(default_gamestate);
	return {
		subscribe,
		update_option_state: (id: string, old_state: any, new_state: any) =>
			update((state) => change_state(state, id, old_state, new_state)),
		initialize: () => set(default_gamestate)
	};
}

export const gamestate = create_gamestate();
