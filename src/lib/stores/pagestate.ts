import { writable, derived, get } from 'svelte/store';

import { sections } from './sections';

function create_scroll_pos() {
	const { subscribe, set } = writable(0);
	return {
		subscribe,
		set,
		initialize: () => set(0)
	};
}

function create_current_section() {
	const { subscribe, set } = writable<string | undefined>(undefined);
	return {
		subscribe,
		set,
		initialize: () => set(undefined)
	};
}

export const scroll_pos = create_scroll_pos();
export const current_section_write = create_current_section();
export const current_section_read = derived([current_section_write], ([$current_section_write]) =>
	get(sections).filter((el) => el.id === $current_section_write).length > 0
		? ($current_section_write as string)
		: get(sections)[0].id
);
