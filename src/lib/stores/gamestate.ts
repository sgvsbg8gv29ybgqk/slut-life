import { writable } from 'svelte/store';

export type gamestate_type = {
	option_states: {
		[id: string]: any;
	};
};

const default_gamestate = {
	option_states: {}
};

function create_gamestate() {
	const { subscribe, set, update } = writable<gamestate_type>(default_gamestate);
	return {
		subscribe,
		update_option_state: (id: string, old_state: any, new_state: any) =>
			update((state) => {
				state.option_states[id] = new_state;
				return state;
			}),
		initialize: () => set(default_gamestate)
	};
}

export const gamestate = create_gamestate();
