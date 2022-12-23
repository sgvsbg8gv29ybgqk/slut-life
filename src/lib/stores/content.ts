import { derived } from 'svelte/store';
import { writable } from 'svelte-local-storage-store';

import uuid from '$lib/core/uuid';
import { current_section_read } from './pagestate';
import type { content_type } from '$lib/components/elements/all_elements';

export type all_content_type = { [section_id: string]: content_type[] };

const default_content: all_content_type = {};

function create_content() {
	const { subscribe, update } = writable<all_content_type>('content', default_content);
	return {
		subscribe,
		remove_section: (id: string) =>
			update((content) => {
				delete content[id];
				return content;
			}),
		add_section: (id: string) =>
			update((content) => {
				if (content[id] === undefined)
					content[id] = [{ template: 'header', id: uuid(), name: 'Content' }];
				return content;
			}),
		add_above: (section: string, id: string, content: content_type) =>
			update((all_content) => {
				for (let i in all_content[section]) {
					if (all_content[section][i].id === id) {
						all_content[section].splice(parseInt(i), 0, content);
						break;
					}
				}
				return all_content;
			}),
		add_below: (section: string, id: string, content: content_type) =>
			update((all_content) => {
				for (let i in all_content[section]) {
					if (all_content[section][i].id === id) {
						all_content[section].splice(parseInt(i) + 1, 0, content);
						break;
					}
				}
				return all_content;
			}),
		change: (section: string, id: string, content: content_type) =>
			update((all_content) => {
				for (let i in all_content[section]) {
					if (all_content[section][i].id === id) {
						all_content[section][i] = content;
						break;
					}
				}
				return all_content;
			}),
		delete: (section: string, id: string) =>
			update((all_content) => {
				if (all_content[section].length === 1) return all_content;
				for (let i in all_content[section]) {
					if (all_content[section][i].id === id) {
						all_content[section].splice(parseInt(i), 1);
						break;
					}
				}
				return all_content;
			})
	};
}

export const content = create_content();

export const current_content = derived(
	[content, current_section_read],
	([$content, $current_section_read]) => {
		if ($content[$current_section_read] === undefined) content.add_section($current_section_read);
		return $content[$current_section_read];
	}
);
