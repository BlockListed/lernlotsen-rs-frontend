<script lang="ts">
	import type { Entry } from '$lib/types';
	import ItemContainer from './item_container.svelte';

	export let entry: [Entry, string];
</script>

<ItemContainer title={entry[1]}>
	{JSON.stringify(entry[0])}
</ItemContainer>
