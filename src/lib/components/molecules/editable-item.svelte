<script lang="ts">
	import { Icon, ChevronUp, ChevronDown, X } from 'svelte-hero-icons';
	import { createEventDispatcher } from 'svelte';

	import EditableText from '../atoms/editable-text.svelte';

	export let value: string;
	export let id: string;

	const dispatch = createEventDispatcher();
</script>

<div class="flex flex-row justify-between w-full">
	<EditableText {id} {value} on:change />
	<div class="p-2 flex flex-row items-center">
		<button on:click={() => dispatch('moveup', { id })}>
			<Icon src={ChevronUp} size="24" class="[&>path]:stroke-1" />
		</button>
		<button on:click={() => dispatch('movedown', { id })}>
			<Icon src={ChevronDown} size="24" class="[&>path]:stroke-1" />
		</button>
		<button on:click={() => dispatch('remove', { id })}>
			<Icon src={X} size="24" class="[&>path]:stroke-1" />
		</button>
	</div>
</div>
