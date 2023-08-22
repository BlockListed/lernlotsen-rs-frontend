<script lang="ts">
	import CreateTimeslot from '$lib/components/create_timeslot.svelte';
	import Timeslot from '$lib/components/timeslot.svelte';

	export let data;

	let timeslots = data.timeslots.msg;
</script>

<CreateTimeslot />

{#each timeslots as timeslot}
	<Timeslot {timeslot} />
{/each}
