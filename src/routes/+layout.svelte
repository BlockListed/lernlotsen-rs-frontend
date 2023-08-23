<script>
	import NavbarItem from '$lib/components/util/navbar_item.svelte';
	import '../app.css';
</script>

<nav class="flex flex-row justify-start bg-slate-500">
	<NavbarItem href="/">Home</NavbarItem>
	<NavbarItem href="/timeslots">Timeslots</NavbarItem>
</nav>

<div class="m-5">
	<slot />
</div>
