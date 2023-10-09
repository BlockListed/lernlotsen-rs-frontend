<script lang="ts">
	import Entry from '$lib/components/entry.svelte';
	import MissingEntry from '$lib/components/missing_entry.svelte';
	import Nothing from '$lib/components/nothing.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: both_empty = !(data.entries.length || data.missing.length);
</script>

{#if both_empty}
	<Nothing message="This timeslot contains no entries. / Doesn't have any missing entries." />
{:else}
	{#if data.missing.length != 0}
		<h2 class="text-2xl font-bold">Missing Entries:</h2>
		{#each data.missing as missing_entry (missing_entry.timestamp)}
			<MissingEntry entry={missing_entry} timeslot={data.timeslot} />
		{/each}
	{/if}

	{#if data.entries.length != 0}
		<h2 class="text-2xl font-bold">Entries:</h2>
		{#each data.entries as entry}
			<Entry {entry} subject={data.timeslot.subject} timeZone={data.timeslot.timezone} />
		{/each}
	{/if}
{/if}
