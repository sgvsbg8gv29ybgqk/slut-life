import { writable } from 'svelte-local-storage-store';

import uuid from '$lib/core/uuid';
import {
	change_value,
	move_up,
	move_down,
	remove,
	add,
	type editable_list_type,
	type editable_list_store
} from '$lib/core/utils';

const default_variables: editable_list_type = [{ id: uuid(), value: 'Variable' }];

function create_variables() {
	const { subscribe, set, update } = writable<editable_list_type>('variables', default_variables);

	return {
		subscribe,
		change_value: (id: string, value: string) =>
			update((variables) => change_value(id, value, variables)),
		move_up: (id: string) => update((variables) => move_up(id, variables)),
		move_down: (id: string) => update((variables) => move_down(id, variables)),
		remove: (id: string) => update((variables) => remove(id, variables)),
		add: () => update((variables) => add(variables, 'Variable')),
		initialize: () => set(default_variables)
	};
}

export const variables: editable_list_store = create_variables();
