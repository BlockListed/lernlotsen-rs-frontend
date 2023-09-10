<script lang="ts">
	import Entry from '$lib/components/entry.svelte';
	import MissingEntry from '$lib/components/missing_entry.svelte';
	import Nothing from '$lib/components/nothing.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: entries = data.entries.msg;

	$: missing = data.missing.msg;

	$: subject = data.timeslot.msg[0].subject;

	$: both_empty = !(entries.length || missing.length);
</script>

{#if both_empty}
	<Nothing message="This timeslot contains no entries. / Doesn't have any missing entries." />
{:else}
	{#if missing.length != 0}
		<h2 class="text-2xl font-bold">Missing Entries:</h2>
		{#each missing as missing_entry (missing_entry[1])}
			<MissingEntry entry={missing_entry} timeslot={data.timeslot.msg[0]} />
		{/each}
	{/if}

	{#if entries.length != 0}
		<h2 class="text-2xl font-bold">Entries:</h2>
		{#each entries as entry}
			<Entry {entry} {subject} />
		{/each}
	{/if}
{/if}
