<script lang="ts">
	export let title: string;
</script>

<div class="bg-sky-700 lg:w-2/3 rounded-md p-4 my-2">
	<h1 class="text-2xl font-semibold">{title}</h1>
	<slot />
</div>
