<script lang="ts">
	import Entry from '$lib/components/entry.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let entries = data.entries.msg;
</script>

{#each entries as entry}
	<Entry {entry} />
{/each}
