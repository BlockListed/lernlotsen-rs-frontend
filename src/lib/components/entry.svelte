<script lang="ts">
	import FaTrash from 'svelte-icons/fa/FaTrash.svelte';

	import type { EntryReturn } from '$lib/types';

	import ItemContainer from './item_container.svelte';
	import DeleteEntry from './delete_entry.svelte';
	import { hide_dialog } from '$lib/util';

	export let entry: EntryReturn;

	export let subject: string;

	export let timeZone: string;

	let dialog: HTMLDialogElement;
</script>

<ItemContainer title={`${subject} - ${entry.timestamp.toLocaleString(undefined, { timeZone })}`}>
	<div class="flex flex-row justify-between content-center">
		<div class="flex flex-col">
			<h2 class="text-xl font-medium">Status: {entry.entry.state.status}</h2>
			{#if entry.entry.state.status === 'Success'}
				<table class="table-auto w-2/3">
					<thead>
						<tr>
							<th class="border border-2 border-slate-900">Student</th>
							<th class="border border-2 border-slate-900">Status</th>
						</tr>
					</thead>

					<tbody>
						{#each entry.entry.state.students as student}
							<tr>
								<td class="border border-2 border-slate-700">{student[0].name}</td>
								<td class="border border-2 border-slate-700">{student[1]}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{/if}
		</div>
		<div class="flex flex-col w-1/12">
			<button on:click={() => dialog.showModal()}>
				<FaTrash />
			</button>
		</div>
	</div>
</ItemContainer>

<dialog
	class="rounded-lg p-4 backdrop:backdrop-blur"
	bind:this={dialog}
	on:click={(e) => hide_dialog(e, dialog)}
>
	<DeleteEntry self={dialog} id={entry.entry.timeslot_id} index={entry.entry.index} />
</dialog>
