<script lang="ts">
	import { page } from '$app/stores';
	import ExportSelect from '$lib/components/export_select.svelte';

	let data: { missing_entries: { subject: string; id: string }[] } | null;

	$: if ($page.status == 428) {
		data = JSON.parse($page.error.message);
	}
</script>

<ExportSelect timeslots={[]} />

<!--Data isn't null, because the check at the top doesn't fail,
	but I need to make ts happy-->
{#if $page.status == 428 && data != null}
	<div class="bg-orange-600">
		Entries in timerange missing from {data.missing_entries.map((e) => e.subject)}. <br />
		{#each data.missing_entries as ts}
			Correct at <a class="hover:underline hover:text-sky-800 text-sky-300" href="/entries/{ts.id}"
				>{ts.subject}</a
			>. <br />
		{/each}
	</div>
{:else if $page.status == 412}
	<div class="bg-orange-600">End year / week is in the fututre.</div>
{/if}
