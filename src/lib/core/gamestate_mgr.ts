import {
	default_option_state,
	type gamestate_type,
	type option_state_type
} from '$lib/stores/gamestate';
import { content, type all_content_type } from '$lib/stores/content';
import { get } from 'svelte/store';
import { calc_point_mods, type editable_list_type } from './utils';
import { points } from '$lib/stores/points';
import { sections } from '$lib/stores/sections';
import { current_section_read } from '$lib/stores/pagestate';

type element_type = {
	id: string;
	cost: number;
	dependencies: string[];
	conflicts: string[];
	point_costs: [string, number][];
	variable_dependencies: [string, string][];
	variable_costs: [string, number][];
	cost_effect: [string, string][];
};

function calc_new_points(
	all_states: gamestate_type,
	old_state: option_state_type,
	new_state: option_state_type,
	element: element_type,
	default_point_id: string
) {
	const old_cost = calc_point_mods(old_state.point_mods, element.cost) * old_state.value;
	const new_cost = calc_point_mods(new_state.point_mods, element.cost) * new_state.value;
	if (old_cost !== new_cost)
		all_states.points[default_point_id] =
			(all_states.points[default_point_id] || 0) - old_cost + new_cost;
}

function get_element(
	all_content: all_content_type,
	all_sections: editable_list_type,
	current_section: string,
	callback: (element: element_type) => boolean
) {
	let result: element_type[] = [];
	for (let i of all_content[current_section]) {
		if (callback(i as element_type)) result.push(i as element_type);
	}
	for (let i of all_sections) {
		if (i.id === current_section) continue;
		for (let j of all_content[i.id] || []) {
			if (callback(j as element_type)) result.push(j as element_type);
		}
	}
	return result;
}

function change_dependencies(
	all_states: gamestate_type,
	all_content: all_content_type,
	all_sections: editable_list_type,
	current_section: string,
	id: string,
	value: number
) {
	const elements = get_element(
		all_content,
		all_sections,
		current_section,
		(el) => el.dependencies && el.dependencies.includes(id)
	);
	for (let i of elements) {
		let element_state = all_states.option_states[i.id] || default_option_state();
		element_state.num_dependency += value;
		all_states.option_states[i.id] = element_state;
	}
}

function change_conflicts(
	all_states: gamestate_type,
	all_content: all_content_type,
	all_sections: editable_list_type,
	current_section: string,
	id: string,
	value: number,
	updates: [string, option_state_type, option_state_type][]
) {
	const elements = get_element(
		all_content,
		all_sections,
		current_section,
		(el) => el.conflicts && el.conflicts.includes(id)
	);
	for (let i of elements) {
		let element_state = all_states.option_states[i.id] || default_option_state();
		element_state.num_conflict += value;
		updates.push([i.id, element_state, element_state]);
	}
}

function test_variables(all_states: gamestate_type, variable_dependencies: [string, string][]) {
	for (let test of variable_dependencies) {
		let x = all_states.variables[test[0]] || 0;
		if (!eval(test[1])) return false;
	}
	return true;
}

export function change_state(
	all_states: gamestate_type,
	id: string,
	old_state: option_state_type,
	new_state: option_state_type,
	all_content?: all_content_type,
	all_points?: editable_list_type,
	all_sections?: editable_list_type,
	current_section?: string
) {
	all_content = all_content || get(content);
	all_points = all_points || get(points);
	const default_point_id = all_points[0].id;
	all_sections = all_sections || get(sections);
	current_section = current_section || get(current_section_read);
	const value_change = new_state.value - old_state.value;
	const element = get_element(all_content, all_sections, current_section, (el) => el.id === id)[0];
	if (new_state.value > 0) {
		if (new_state.num_conflict > 0 || !test_variables(all_states, element.variable_dependencies)) {
			new_state.state = false;
			new_state.value = 0;
		}
	}
	all_states.option_states[id] = new_state;
	// cost
	calc_new_points(all_states, old_state, new_state, element, default_point_id);
	// point_costs
	for (let i of element.point_costs)
		all_states.points[i[0]] = (all_states.points[i[0]] || 0) + value_change * i[1];
	// variable_costs
	for (let i of element.variable_costs) {
		all_states.variables[i[0]] = (all_states.variables[i[0]] || 0) + value_change * i[1];
	}
	let updates: [string, option_state_type, option_state_type][] = [];
	if (old_state.value === 0 && new_state.value > 0) {
		// checked
		// dependencies
		change_dependencies(all_states, all_content, all_sections, current_section, id, 1);
		// conflicts
		change_conflicts(all_states, all_content, all_sections, current_section, id, -1, updates);
		// cost effect
		for (let i of element.cost_effect) {
			const old_state = all_states.option_states[i[0]] || default_option_state();
			const new_state: option_state_type = { ...old_state, point_mods: [...old_state.point_mods] };
			new_state.point_mods.push(i[1]);
			updates.push([i[0], old_state, new_state]);
		}
	} else if (old_state.value > 0 && new_state.value === 0) {
		// unchecked
		// dependencies
		change_dependencies(all_states, all_content, all_sections, current_section, id, -1);
		// conflicts
		change_conflicts(all_states, all_content, all_sections, current_section, id, 1, updates);
		// cost effect
		for (let i of element.cost_effect) {
			const old_state = all_states.option_states[i[0]] || default_option_state();
			const index = old_state.point_mods.indexOf(i[1]);
			const new_state: option_state_type = { ...old_state, point_mods: [...old_state.point_mods] };
			new_state.point_mods.splice(index, 1);
			updates.push([i[0], old_state, new_state]);
		}
	}
	for (let i of element.variable_costs) {
		const variable_elements = get_element(
			all_content,
			all_sections,
			current_section,
			(el) =>
				el.variable_dependencies &&
				el.variable_dependencies.filter((el2) => el2[0] === i[0]).length > 0
		);
		for (let j of variable_elements) {
			const id = j.id;
			const state = all_states.option_states[id] || default_option_state();
			updates.concat([id, state, state]);
		}
	}
	for (let update of updates) {
		change_state(
			all_states,
			update[0],
			update[1],
			update[2],
			all_content,
			all_points,
			all_sections,
			current_section
		);
	}
	return all_states;
}
