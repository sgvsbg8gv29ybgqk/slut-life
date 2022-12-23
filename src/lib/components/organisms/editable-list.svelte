<script lang="ts">
	import type { editable_list_store } from '$lib/core/utils';

	import EditableItem from '../molecules/editable-item.svelte';

	export let item_store: editable_list_store;
	export let add_name: string;
</script>

<div class="overflow-hidden shadow border border-purple-100 sm:rounded-md">
	<ul class="divide-y divide-purple-100">
		{#each $item_store as item}
			<li>
				<div class="flex items-center sm:px-2 p-1">
					<EditableItem
						{...item}
						on:change={(event) => item_store.change_value(event.detail.id, event.detail.value)}
						on:movedown={(event) => item_store.move_down(event.detail.id)}
						on:moveup={(event) => item_store.move_up(event.detail.id)}
						on:remove={(event) => item_store.remove(event.detail.id)}
					/>
				</div>
			</li>
		{/each}
		<li>
			<button
				class="sm:px-2 p-1 text-center w-full flex flex-row items-center text-purple-500 bg-purple-100 justify-center"
				on:click={() => item_store.add()}
			>
				Add {add_name}
			</button>
		</li>
	</ul>
</div>
