<script lang="ts">
	import type { Timeslot } from '$lib/types';
	import { stringify } from 'postcss';
	import type { PageData } from './$types';

	export let data: PageData;

	$: timeslots = data.timeslots;
</script>

<div class="flex flex-col">
	{#each timeslots as list_entry}
		<span>{JSON.stringify(list_entry)}</span>
	{/each}
</div>
