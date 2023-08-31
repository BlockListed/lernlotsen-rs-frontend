<script lang="ts">
	export let title: string;
</script>

<div class="bg-teal-400 md:w-2/3 rounded-md p-4 my-2">
	<h1 class="text-2xl font-semibold">{title}</h1>
	<slot />
</div>
