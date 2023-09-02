<script lang="ts">
	import Entry from '$lib/components/entry.svelte';
	import MissingEntry from '$lib/components/missing_entry.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let entries = data.entries.msg;

	let missing = data.missing.msg;

	let subject = data.timeslot.msg[0].subject;
</script>

<h2 class="text-2xl font-bold">Missing Entries:</h2>
{#each missing as missing_entry}
	<MissingEntry entry={missing_entry} timeslot={data.timeslot.msg[0]} />
{/each}

<h2 class="text-2xl font-bold">Entries:</h2>
{#each entries as entry}
	<Entry {entry} {subject} />
{/each}
