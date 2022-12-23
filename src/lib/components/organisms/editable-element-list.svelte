<script lang="ts">
	import type { content_type } from '../elements/all_elements';
	import EditElementModal from './edit-element-modal.svelte';

	import EditableElement from '../molecules/editable-element.svelte';

	export let contents: content_type[];
	let open = false;
	type possible_states = 'addbefore' | 'addafter' | 'edit';
	let edit_state: { state: possible_states; id: string };

	function open_modal(state: possible_states) {
		return (event: CustomEvent<string>) => {
			edit_state = { id: event.detail, state };
			open = true;
		};
	}
</script>

<ul class="text-left">
	{#each contents as content}
		<li>
			<EditableElement
				{content}
				on:edit={open_modal('edit')}
				on:addbefore={open_modal('addbefore')}
				on:addafter={open_modal('addafter')}
			/>
		</li>
	{/each}
</ul>
<EditElementModal {open} {edit_state} on:close={() => (open = false)} />
