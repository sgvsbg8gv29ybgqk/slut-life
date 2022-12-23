<script lang="ts">
	import { Dialog, Transition, TransitionChild } from '@rgossiaux/svelte-headlessui';
	import ModalContent from './modal-content.svelte';

	export let open: boolean;
	type possible_states = 'addbefore' | 'addafter' | 'edit';
	export let edit_state: { state: possible_states; id: string };
</script>

<Transition show={open}>
	<Dialog {open} as="div" class="relative z-10">
		<TransitionChild
			enter="ease-out duration-300"
			enterFrom="opacity-0"
			enterTo="opacity-100"
			leave="ease-in duration-200"
			leaveFrom="opacity-100"
			leaveTo="opacity-0"
		>
			<div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
		</TransitionChild>

		<div class="fixed inset-0 z-10 overflow-y-auto">
			<div class="flex min-h-full justify-center p-4 text-center items-center">
				<TransitionChild
					enter="ease-out duration-300"
					enterFrom="opacity-0 translate-y-4 translate-y-0 scale-95"
					enterTo="opacity-100 translate-y-0 scale-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100 translate-y-0 scale-100"
					leaveTo="opacity-0 translate-y-4 translate-y-0 scale-95"
				>
					<ModalContent on:close {edit_state} />
				</TransitionChild>
			</div>
		</div>
	</Dialog>
</Transition>
