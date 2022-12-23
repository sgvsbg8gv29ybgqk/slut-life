<script lang="ts">
	export let name: string;
	export let value: string = '';
</script>

<div>
	<label for={name} class="block text-sm font-medium text-gray-700">{name.toUpperCase()}</label>
	<div class="mt-1">
		<textarea
			bind:value
			rows="4"
			{name}
			id={name}
			class="block w-full rounded-md border border-solid border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
		/>
	</div>
</div>
