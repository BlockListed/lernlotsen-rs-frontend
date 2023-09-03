<script lang="ts">
	import GiEmptyMetalBucketHandle from 'svelte-icons/gi/GiEmptyMetalBucketHandle.svelte';

	export let message: string;
</script>

<div class="grid grid-rows-3 h-32 w-full text-center justify-items-center items-start">
	<h3 class="text-lg font-semibold">Nothing here.</h3>
	<h3 class="font-light">{message}</h3>
	<div class="flex justify-center w-1/4">
		<GiEmptyMetalBucketHandle class="w-1" />
	</div>
</div>
