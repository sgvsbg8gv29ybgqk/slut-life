import { writable } from 'svelte-local-storage-store';

import uuid from '$lib/core/uuid';
import {
	change_value,
	move_up,
	move_down,
	remove,
	add,
	type editable_list_store,
	type editable_list_type
} from '$lib/core/utils';
import { content } from './content';

const default_sections: editable_list_type = [{ id: uuid(), value: 'Section' }];

function create_sections() {
	const { subscribe, set, update } = writable<editable_list_type>('sections', default_sections);

	return {
		subscribe,
		change_value: (id: string, value: string) =>
			update((section) => change_value(id, value, section)),
		move_up: (id: string) => update((section) => move_up(id, section)),
		move_down: (id: string) => update((section) => move_down(id, section)),
		remove: (id: string) => {
			update((section) => remove(id, section));
			content.remove_section(id);
		},
		add: () => update((section) => add(section, 'Section')),
		initialize: () => set(default_sections)
	};
}

export const sections: editable_list_store = create_sections();
