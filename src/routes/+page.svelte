<script lang="ts">
	import type { Timeslot } from '$lib/types';
	import { stringify } from 'postcss';
	import type { PageData } from './$types';

	export let data: PageData;

	$: missing = data.missing_entries;
</script>

<div class="flex flex-col">
	{#each missing as list_entry}
		<span>{JSON.stringify(list_entry)}</span>
	{/each}
</div>
