<script lang="ts">
	import TiExportOutline from 'svelte-icons/ti/TiExportOutline.svelte';

	import type { PageData } from './$types';
	import ItemContainer from '$lib/components/item_container.svelte';
	import Timeslot from '$lib/components/timeslot.svelte';
	import CreateTimeslot from '$lib/components/create_timeslot.svelte';
	import ExportSelect from '$lib/components/export_select.svelte';

	export let data: PageData;

	$: timeslots = data.timeslots;

	let create_visible = false;

	let export_dialog: HTMLDialogElement;

	function hide_dialog(e: MouseEvent) {
		const rect = export_dialog.getBoundingClientRect();

		let in_box = e.x > rect.left && e.x < rect.right && e.y > rect.top && e.y < rect.bottom;

		if (!in_box) {
			export_dialog.close();
		}
	}
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
	<dialog
		bind:this={export_dialog}
		on:click={hide_dialog}
		class="rounded-lg p-4 backdrop:backdrop-blur"
	>
		<ExportSelect timeslots={timeslots.map((ts) => ts[0])} />
	</dialog>
</div>

<CreateTimeslot visible={create_visible} />

<div class="flex flex-col">
	{#each timeslots as list_entry}
		<a href={`/entries/${list_entry[0].id}/`}>
			<ItemContainer title={`${list_entry[0].subject} - ${list_entry[0].weekday}`}>
				<div class="flex flex-col">
					<Timeslot timeslot={list_entry[0]} />
					<div>
						<h2 class="text-xl font-semibold inline">Next date:</h2>
						<span class="inline">{list_entry[1][1].toLocaleString()}</span>
					</div>
					<span
						>{list_entry[2]} {list_entry[2] == 1 ? 'entry' : 'entries'} missing.</span
					>
				</div>
			</ItemContainer>
		</a>
	{/each}
</div>
