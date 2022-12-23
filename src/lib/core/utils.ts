import type { all_content_type } from '$lib/stores/content';
import type { Readable } from 'svelte/store';
import uuid from './uuid';

export type editable_list_type = { id: string; value: string }[];

export interface editable_list_store extends Readable<editable_list_type> {
	change_value: (id: string, value: string) => void;
	move_up: (id: string) => void;
	move_down: (id: string) => void;
	remove: (id: string) => void;
	add: () => void;
	initialize: () => void;
}

export function change_value(id: string, value: string, items: editable_list_type) {
	for (let i in items) {
		if (items[i].id === id) {
			items[i].value = value;
			break;
		}
	}
	return items;
}

export function move_up(id: string, items: editable_list_type) {
	for (let i in items) {
		if (items[i].id === id) {
			if (i === '0') return items;
			[items[parseInt(i) - 1], items[i]] = [items[i], items[parseInt(i) - 1]];
			break;
		}
	}
	return items;
}

export function move_down(id: string, items: editable_list_type) {
	for (let i in items) {
		if (items[i].id === id) {
			if (parseInt(i) === items.length - 1) return items;
			[items[parseInt(i) + 1], items[i]] = [items[i], items[parseInt(i) + 1]];
			break;
		}
	}
	return items;
}

export function remove(id: string, items: editable_list_type) {
	if (items.length === 1) return items;
	return items.filter((item) => item.id !== id);
}

export function add(items: editable_list_type, name: string) {
	const id = uuid();
	items.push({ id, value: name });
	return items;
}

export function get_all_options(sections: editable_list_type, content: all_content_type) {
	const black_list = new Set(['header', 'divider', 'comment']);
	let result: { name: string; id: string }[] = [];
	for (let section of sections)
		if (content[section.id])
			for (let item of content[section.id])
				if (!black_list.has(item.template)) result.push({ name: (item as any).name, id: item.id });
	return result;
}
