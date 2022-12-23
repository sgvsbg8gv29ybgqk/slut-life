<script lang="ts">
	import { elements, type content_type } from '../elements/all_elements';

	export let content: content_type;
</script>

<div class="w-full py-1 font-light">
	<svelte:component this={elements[content.template][1]} {...content} />
</div>
