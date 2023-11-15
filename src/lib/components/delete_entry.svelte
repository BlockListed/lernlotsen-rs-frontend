<script lang="ts">
	import { invalidate } from '$app/navigation';

	export let id: string;
	export let index: number;

	export let self: HTMLDialogElement;

	async function del() {
		const resp = await fetch(`/entries/${id}/${index}`, {
			method: 'DELETE'
		});

		if (resp.status != 200) {
			throw new Error('Something bad happened');
		}

		invalidate('app:entries');

		self.close();
	}
</script>

<div class="flex flex-col gap-4">
	<h2>Are you sure you wish to delete this entry?</h2>
	<div class="flex flex-row justify-around">
		<button class="rounded bg-red-500 p-2" on:click={() => self.close()}>Cancel</button>
		<button class="rounded bg-green-500 p-2" on:click={del}>Confirm</button>
	</div>
</div>
