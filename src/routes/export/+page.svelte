<script lang="ts">
	import type { PageData } from "./$types";

	import ExportSelect from "$lib/components/export_select.svelte";

	export let data: PageData;
</script>

<ExportSelect timeslots={[]} />
<pre class="m-2 bg-slate-300">
{data.export}
</pre>