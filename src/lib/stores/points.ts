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

const default_points: editable_list_type = [{ id: uuid(), value: 'Credit' }];

function create_points() {
	const { subscribe, set, update } = writable<editable_list_type>('points', default_points);

	return {
		subscribe,
		change_value: (id: string, value: string) =>
			update((points) => change_value(id, value, points)),
		move_up: (id: string) => update((points) => move_up(id, points)),
		move_down: (id: string) => update((points) => move_down(id, points)),
		remove: (id: string) => update((points) => remove(id, points)),
		add: () => update((points) => add(points, 'Credit')),
		initialize: () => set(default_points)
	};
}

export const points: editable_list_store = create_points();
