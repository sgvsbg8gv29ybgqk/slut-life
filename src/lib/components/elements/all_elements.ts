// To add an element to the project, first implement a component in the current directory,
// import the element below, add params, props, and add it to the last two exports.
import type { ComponentType } from 'svelte';
import Comment from './comment.svelte';
import Divider from './divider.svelte';
import Header from './header.svelte';
import OptionCheckbox from './option-checkbox.svelte';
import OptionFloat from './option-float.svelte';
import OptionText from './option-text.svelte';

type base_option = {
	id: string;
};

type params_type = {
	name: string;
	description: string;
	template: string;
	props: { [name: string]: keyof MapTypes };
};

type prop_type<
	T extends {
		name: string;
		description: string;
		template: string;
		props: Record<string, keyof MapTypes>;
	}
> = {
	-readonly [K in keyof T['props']]: MapTypes[T['props'][K]];
} & { template: T['template'] };

// If you want to add a new type of input, add it here

type MapTypes = {
	string: string;
	long_string: string;
	number: number;
	option_list: string[];
	option_effect: [string, string][];
	point_cost: [string, number][];
	variable_dep: [string, string][];
	variable_cost: [string, number][];
};

export type prop_option_type = keyof MapTypes;

export const base_variable_props = {
	cost: 'number',
	dependencies: 'option_list',
	conflicts: 'option_list',
	point_costs: 'point_cost',
	variable_dependencies: 'variable_dep',
	variable_costs: 'variable_cost',
	cost_effect: 'option_effect'
} as const;

// ========== Props and Params ==========

// Header

const header_params = {
	name: 'Header',
	description: 'Header',
	template: 'header' as const,
	props: { name: 'string' }
} satisfies params_type;

// Divider

const divider_params = {
	name: 'Divider',
	description: 'Divider',
	template: 'divider' as const,
	props: {}
} satisfies params_type;

// Comment

const comment_params = {
	name: 'Comment',
	description: 'Comment',
	template: 'comment' as const,
	props: { name: 'string', content: 'long_string' }
} satisfies params_type;

// Float

const float_params = {
	name: 'Float',
	description: 'Floating point option, does not have a point value',
	template: 'float' as const,
	props: {
		name: 'string',
		content: 'long_string',
		minimum: 'number',
		maximum: 'number'
	}
} satisfies params_type;

// Text

const text_params = {
	name: 'Text',
	description: 'Text option, does not have a point value',
	template: 'text' as const,
	props: {
		name: 'string',
		content: 'long_string',
		options: 'long_string'
	}
} satisfies params_type;

// Checkbox

const checkbox_params = {
	name: 'Checkbox',
	description: 'Checkbox',
	template: 'checkbox' as const,
	props: {
		name: 'string',
		content: 'long_string',
		...base_variable_props
	}
} satisfies params_type;

// ========== Aggregate Types and Objects ==========

// Add to the following two when an element is added above

export type content_type = (
	| prop_type<typeof header_params>
	| prop_type<typeof divider_params>
	| prop_type<typeof comment_params>
	| prop_type<typeof checkbox_params>
	| prop_type<typeof float_params>
	| prop_type<typeof text_params>
) &
	base_option;

export const elements: { [template: string]: [params_type, ComponentType] } = {
	comment: [comment_params, Comment],
	divider: [divider_params, Divider],
	header: [header_params, Header],
	checkbox: [checkbox_params, OptionCheckbox],
	float: [float_params, OptionFloat],
	text: [text_params, OptionText]
};
