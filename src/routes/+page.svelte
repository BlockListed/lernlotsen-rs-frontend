<script lang="ts">
	import type { PageData } from './$types';
	import ItemContainer from '$lib/components/item_container.svelte';
	import Timeslot from '$lib/components/timeslot.svelte';
	import CreateTimeslot from '$lib/components/create_timeslot.svelte';

	export let data: PageData;

	$: timeslots = data.timeslots;

	let create_visible = false;
</script>

<button
	on:click={() => (create_visible = !create_visible)}
	class="bg-slate-500 rounded-md p-2 lg:w-2/3 w-full text-xl font-semibold"
	>{create_visible ? 'Hide' : 'Show'}</button
>

<CreateTimeslot visible={create_visible} />

<div class="flex flex-col">
	{#each timeslots as list_entry}
	<a href={`/entries/${list_entry[0].id}/`}>
			<ItemContainer title={`${list_entry[0].subject} - ${list_entry[0].weekday}`}>
				<div class="flex flex-col">
					<Timeslot timeslot={list_entry[0]}/>
					<div>
						<h2 class="text-xl font-semibold inline">Next date:</h2>
						<span class="inline">{list_entry[1][1].toLocaleString()}</span>
					</div>
					<span>{list_entry[2].length} {list_entry[2].length == 1 ? "entry" : "entries"} missing.</span>
				</div>
			</ItemContainer>
		</a>
	{/each}
</div>
