<script lang="ts">
	import { Icon, Cog } from 'svelte-hero-icons';

	import { current_content } from '$lib/stores/content';
	import { scroll_pos } from '$lib/stores/pagestate';
	import { sections } from '$lib/stores/sections';

	import EditableElementList from '../organisms/editable-element-list.svelte';
	import SectionsNav from '../organisms/sections-nav.svelte';
	import Combobox from '../atoms/combobox.svelte';
</script>

<svelte:window bind:scrollY={$scroll_pos} />
{#if $sections.length > 1}
	<SectionsNav />
{/if}
<div class="flex flex-row items-start w-screen mt-6">
	<a class="fixed right-4 top-4" href="/settings" aria-label="Settings navigation">
		<Icon class="[&>path]:stroke-1" src={Cog} size="32" />
	</a>
	<div class="p-2 sm:mx-10 grow">
		<EditableElementList contents={$current_content || []} />
	</div>
</div>
