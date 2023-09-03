<script lang="ts">
	import ItemContainer from './item_container.svelte';

	import type { Timeslot as tTimeslot } from '$lib/types';
	import Timeslot from './timeslot.svelte';

	export let timeslot: tTimeslot;
</script>

<a href={`/entries/${timeslot.id}`}>
	<ItemContainer title={`${timeslot.subject} - ${timeslot.weekday}`}>
		<Timeslot {timeslot} />
	</ItemContainer>
</a>