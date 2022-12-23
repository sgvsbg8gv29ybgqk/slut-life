<script lang="ts">
	import BaseOption from '../atoms/base-option.svelte';

	export let template: string;
	template;
	export let id: string;
	id;
	export let name: string;
	export let content: string;
</script>

<BaseOption {name} {content} cost={0} />
