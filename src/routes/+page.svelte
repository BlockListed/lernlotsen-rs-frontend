<script lang="ts">
	import TiExportOutline from 'svelte-icons/ti/TiExportOutline.svelte';

	import type { PageData } from './$types';
	import ItemContainer from '$lib/components/item_container.svelte';
	import Timeslot from '$lib/components/timeslot.svelte';
	import CreateTimeslot from '$lib/components/create_timeslot.svelte';
	import ExportSelect from '$lib/components/export_select.svelte';
	import { hide_dialog } from '$lib/util';

	export let data: PageData;

	$: timeslots = data.timeslots;

	let create_visible = false;

	let export_dialog: HTMLDialogElement;
</script>

<div class="flex flex-row lg:w-2/3 w-full">
	<button
		on:click={() => (create_visible = !create_visible)}
		class="bg-sky-500 rounded-md p-2 grow text-xl font-semibold"
		>{create_visible ? 'Hide' : 'Show'}</button
	>
	<div class="w-20 text-sky-500">
		<button on:click={() => export_dialog.showModal()}><TiExportOutline /></button>
	</div>
</div>

<CreateTimeslot visible={create_visible} />

<div class="flex flex-col">
	{#each timeslots as list_entry}
		<a href={`/entries/${list_entry.ts.id}/`}>
			<ItemContainer title={`${list_entry.ts.subject} - ${list_entry.ts.weekday}`}>
				<div class="flex flex-col">
					<Timeslot timeslot={list_entry.ts} />
					<div>
						<h2 class="text-xl font-semibold inline">Next date:</h2>
						<span class="inline"
							>{list_entry.next.timestamp.toLocaleString(undefined, {
								timeZone: list_entry.ts.timezone
							})}</span
						>
					</div>
					<span>{list_entry.missing} {list_entry.missing == 1 ? 'entry' : 'entries'} missing.</span>
				</div>
			</ItemContainer>
		</a>
	{/each}
</div>

<dialog
	bind:this={export_dialog}
	on:click={(e) => hide_dialog(e, export_dialog)}
	class="rounded-lg p-4 backdrop:backdrop-blur"
>
	<ExportSelect timeslots={timeslots.map((ts) => ts.ts)} />
</dialog>
