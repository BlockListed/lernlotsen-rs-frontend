<script lang="ts">
	import CreateTimeslot from '$lib/components/create_timeslot.svelte';
	import Timeslot from '$lib/components/timeslot.svelte';

	export let data;

	let timeslots = data.timeslots.msg;

	let create_visible = false;
</script>

<button
	on:click={() => (create_visible = !create_visible)}
	class="bg-slate-500 rounded-md p-2 md:w-2/3 w-full text-xl font-semibold"
	>{create_visible ? 'Hide' : 'Show'}</button
>

<CreateTimeslot visible={create_visible} />

{#each timeslots as timeslot}
	<Timeslot {timeslot} />
{/each}
