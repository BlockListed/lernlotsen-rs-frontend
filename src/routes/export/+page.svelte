<script lang="ts">
	import type { PageData } from './$types';

	import ExportSelect from '$lib/components/export_select.svelte';

	export let data: PageData;

	function toClipboard() {
		navigator.clipboard.writeText(data.export);
	}
</script>

<div class="md:w-2/3">
	<ExportSelect timeslots={[]} />
</div>
<pre on:click={toClipboard} class="m-2 bg-slate-300 md:w-2/3">
{data.export}
</pre>
