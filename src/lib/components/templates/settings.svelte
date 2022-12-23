<script lang="ts">
	import { Icon, ArrowLeft } from 'svelte-hero-icons';

	import { sections } from '$lib/stores/sections';
	import { points } from '$lib/stores/points';
	import { variables } from '$lib/stores/variables';

	import EditableList from '../organisms/editable-list.svelte';
</script>

<div class="flex flex-col items-center w-full">
	<div class="max-w-lg mx-12 my-4">
		<a class="fixed -translate-x-10 my-1" href="/edit">
			<Icon src={ArrowLeft} size="28" class="[&>path]:stroke-1" />
		</a>
		<div class="divide-y divide-purple-100">
			<h1 class="text-3xl mb-2">Project Settings</h1>
			<div class="pt-2 mb-4">
				<h1 class="text-xl">Sections</h1>
				<span class="text-sm leading-tight text-gray-400 block mb-4">
					These are the sections that the cyoa will contain. The first section is the default one,
					and there needs to be at least one section, although the nav bar is not shown if there is
					only one section.
				</span>
				<EditableList item_store={sections} add_name="Section" />
			</div>
			<div class="pt-2 mb-4">
				<h1 class="text-xl">Points</h1>
				<span class="text-sm leading-tight text-gray-400 block mb-4">
					These are the points that the cyoa will contain. I'm sure you don't need much explanation
					for that.
				</span>
				<EditableList item_store={points} add_name="Point" />
			</div>
			<div class="pt-2 mb-4">
				<h1 class="text-xl">Variables</h1>
				<span class="text-sm leading-tight text-gray-400 block mb-4">
					These are the variables that the cyoa will contain. Variables are commonly used to
					represent conditions.
				</span>
				<EditableList item_store={variables} add_name="Variable" />
			</div>
		</div>
	</div>
</div>
