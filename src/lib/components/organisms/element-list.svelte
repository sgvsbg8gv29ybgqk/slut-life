<script lang="ts">
	import type { content_type } from '../elements/all_elements';

	import Element from '../molecules/element.svelte';

	export let contents: content_type[];
</script>

<ul class="text-left">
	{#each contents as content}
		<li>
			<Element {content} />
		</li>
	{/each}
</ul>
