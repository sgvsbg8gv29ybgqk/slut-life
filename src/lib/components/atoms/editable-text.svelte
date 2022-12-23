<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	export let id: string;
	export let value: string;

	const dispatch = createEventDispatcher();
	let editing = false;
	let current_value: string;

	onMount(() => {
		current_value = value;
	});

	function submit() {
		if (current_value === '') current_value = value;
		else if (current_value !== value) dispatch('change', { id, value: current_value });
		editing = false;
	}

	function keydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			event.preventDefault();
			current_value = value;
			editing = false;
		}
	}

	function focus(element: HTMLElement) {
		element.focus();
	}
</script>

{#if editing}
	<form on:submit|preventDefault={submit} on:keydown={keydown}>
		<input
			bind:value={current_value}
			on:blur={submit}
			required
			use:focus
			class="p-2 text-left text-xl"
		/>
	</form>
{:else}
	<button on:click={() => (editing = true)} class="p-2 text-left text-xl">{value}</button>
{/if}
