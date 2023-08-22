<script lang="ts">
	import CreateTimeslot from '$lib/components/create_timeslot.svelte';
	import Timeslot from '$lib/components/timeslot.svelte';

	export let data;

	let timeslots = data.timeslots.msg;

	let hidden = true;
</script>

<button on:click={() => hidden = !hidden}>{hidden ? "Show" : "Hide"}</button>

<CreateTimeslot {hidden} />

{#each timeslots as timeslot}
	<Timeslot {timeslot} />
{/each}
