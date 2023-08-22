<script lang="ts">
	export let href: string;
</script>

<a class="bg-slate-400 m-2 p-2 rounded-lg font-semibold hover:bg-slate-300 transition-colors" {href}>
	<div>
		<slot />
	</div>
</a>