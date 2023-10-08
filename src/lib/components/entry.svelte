<script lang="ts">
	import type { EntryReturn } from '$lib/types';
	import ItemContainer from './item_container.svelte';

	export let entry: EntryReturn;

	export let subject: string;
</script>

<ItemContainer title={`${subject} - ${entry.timestamp.toLocaleString()}`}>
	<div class="flex flex-col">
		<h2 class="text-xl font-medium">Status: {entry.entry.state.status}</h2>
		{#if entry.entry.state.status === 'Success'}
			<table class="table-auto w-2/3">
				<thead>
					<tr>
						<th class="border border-2 border-slate-900">Student</th>
						<th class="border border-2 border-slate-900">Status</th>
					</tr>
				</thead>

				<tbody>
					{#each entry.entry.state.students as student}
						<tr>
							<td class="border border-2 border-slate-700">{student[0].name}</td>
							<td class="border border-2 border-slate-700">{student[1]}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{/if}
	</div>
</ItemContainer>
