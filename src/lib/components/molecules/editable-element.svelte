<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Icon, Cog, PlusCircle } from 'svelte-hero-icons';

	import type { content_type } from '../elements/all_elements';

	import Element from './element.svelte';

	export let content: content_type;

	let icon_visible = false;
	const dispatch = createEventDispatcher();
</script>

<div
	on:mouseenter={() => (icon_visible = true)}
	on:mouseleave={() => (icon_visible = false)}
	class="flex flex-row items-center"
>
	<button
		class="flex flex-row absolute right-2 sm:right-16"
		on:click={() => dispatch('edit', content.id)}
	>
		<Icon
			class={'[&>path]:stroke-1 fill-white ' + (!icon_visible ? 'invisible' : '')}
			src={Cog}
			size="32"
		/>
	</button>
	<div class="flex flex-col items-center w-full">
		<button on:click={() => dispatch('addbefore', content.id)}>
			<Icon
				src={PlusCircle}
				size="32"
				class={'absolute [&>path]:stroke-1 fill-white -translate-y-7 ' +
					(!icon_visible ? 'invisible' : '')}
			/>
		</button>
		<Element {content} />
		<button on:click={() => dispatch('addafter', content.id)}>
			<Icon
				src={PlusCircle}
				size="32"
				class={'absolute [&>path]:stroke-1 fill-white -translate-y-1 ' +
					(!icon_visible ? 'invisible' : '')}
			/>
		</button>
	</div>
</div>
