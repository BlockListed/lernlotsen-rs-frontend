<script lang="ts">
	import { page } from '$app/stores';
	import ExportSelect from '$lib/components/export_select.svelte';
</script>

{#if $page.status == 428}
<ExportSelect timeslots={[]} />
{/if}