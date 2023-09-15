<script lang="ts">
	import type { PageData } from './$types';

	import ExportSelect from '$lib/components/export_select.svelte';

	export let data: PageData;
</script>

<div class="md:w-2/3">
	<ExportSelect timeslots={[]} />
</div>
<pre class="m-2 bg-slate-300 md:w-2/3">
{data.export}
</pre>
