<script lang="ts">
	import Entry from '$lib/components/entry.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let entries = data.entries.msg;

	let subject = data.timeslot.msg[0].subject;
</script>

<h2 class="text-2xl font-bold">Entries:</h2>
{#each entries as entry}
	<Entry {entry} {subject} />
{/each}
