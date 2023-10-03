<script lang="ts">
	import ItemContainer from './item_container.svelte';
	import type { Timeslot, UnfilledEntry } from '$lib/types';
	import CreateEntry from './create_entry.svelte';

	export let entry: UnfilledEntry;
	export let timeslot: Timeslot;

	$: date = new Date(entry.timestamp).toLocaleString();
</script>

<ItemContainer title={date}>
	<CreateEntry {timeslot} {entry} />
</ItemContainer>
