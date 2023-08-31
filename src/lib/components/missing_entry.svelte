<script lang="ts">
	import ItemContainer from "./item_container.svelte";
	import type { Timeslot } from "$lib/types";
	import CreateEntry from "./create_entry.svelte";

	export let entry: [number, string];
	export let timeslot: Timeslot;

	$: date = new Date(entry[1]).toLocaleString()
</script>

<ItemContainer title={date}>
	<CreateEntry {timeslot} {entry} />
</ItemContainer>