<script lang="ts">
	import ItemContainer from './item_container.svelte';

	import type { Timeslot } from '$lib/types';

	export let timeslot: Timeslot;
</script>

<a href={`/entries/${timeslot.id}`}>
	<ItemContainer title={timeslot.subject}>
		<div class="flex flex-col">
			<div>Weekday: <strong>{timeslot.weekday}</strong></div>
			<div>Start: <strong>{timeslot.time.start}</strong></div>
			<div>End: <strong>{timeslot.time.end}</strong></div>
			<div>Contract: <strong> {timeslot.timerange.start} - {timeslot.timerange.end} </strong></div>
		</div>
		<h2 class="text-xl font-semibold">Students:</h2>
		<ul class="list-inside list-disc">
			{#each timeslot.students as student}
				<li>{student.name}</li>
			{/each}
		</ul>
	</ItemContainer>
</a>
