<script lang="ts">
	import { Icon, ArrowLeft } from 'svelte-hero-icons';
	import { get } from 'svelte/store';

	import { sections } from '$lib/stores/sections';
	import { points } from '$lib/stores/points';
	import { variables } from '$lib/stores/variables';
	import { content } from '$lib/stores/content';

	import EditableList from '../organisms/editable-list.svelte';

	function on_export() {
		const result = {
			content: get(content),
			points: get(points),
			sections: get(sections),
			variables: get(variables)
		};
		const data_str = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(result));
		const downloadAnchorNode = document.createElement('a');
		downloadAnchorNode.setAttribute('href', data_str);
		downloadAnchorNode.setAttribute('download', 'project.json');
		document.body.appendChild(downloadAnchorNode);
		downloadAnchorNode.click();
		downloadAnchorNode.remove();
	}

	function on_import() {
		const input_element = document.getElementById('fileInput');
		if (input_element) input_element.click();
	}

	function on_actual_import(event: { currentTarget: HTMLInputElement }) {
		if (event.currentTarget.files) {
			const read = new FileReader();
			read.readAsText(event.currentTarget.files[0]);
			read.onloadend = () => {
				const result = JSON.parse(read.result as string);
				localStorage.content = JSON.stringify(result.content);
				localStorage.points = JSON.stringify(result.points);
				localStorage.sections = JSON.stringify(result.sections);
				localStorage.variables = JSON.stringify(result.variables);
				location.reload();
			};
		}
	}
</script>

<div class="flex flex-col items-center w-full">
	<div class="max-w-lg mx-12 my-4">
		<a class="fixed -translate-x-10 my-1" href="/edit">
			<Icon src={ArrowLeft} size="28" class="[&>path]:stroke-1" />
		</a>
		<div class="divide-y divide-purple-100">
			<h1 class="text-3xl mb-2">Project Settings</h1>
			<div class="pt-2 mb-4">
				<button
					type="button"
					class="inline-flex w-full justify-center rounded-md border border-transparent bg-purple-400 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2 mr-2 mt-4"
					on:click={on_export}
				>
					Export to JSON
				</button>
				<button
					type="button"
					class="inline-flex w-full justify-center rounded-md border border-transparent bg-green-400 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2 mr-2 mt-4"
					on:click={on_import}
				>
					Import From JSON
				</button>
				<input id="fileInput" type="file" class="hidden" on:change={on_actual_import} />
			</div>
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
