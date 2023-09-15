<script lang="ts">
	import { invalidate } from '$app/navigation';
	import type { Student, Timeslot, CreateEntry, EntryState, SuccessState } from '$lib/types';

	export let timeslot: Timeslot;
	export let entry: [number, string];

	let form: HTMLFormElement;

	let status: string;

	async function handle_submit(e: SubmitEvent) {
		console.log('submitted');

		let student_states = form.querySelectorAll('#student_states select');

		let student_statuses: [Student, string][] = [];

		student_states.forEach((s) => {
			const ele = s as HTMLSelectElement;

			let name = ele.getAttribute('name');

			if (!name) {
				throw new Error('Missing name attribute on select');
			}

			let value = ele.selectedOptions[0].value;

			student_statuses.push([{ name }, value]);
		});

		let state: EntryState;

		if (status == 'Success') {
			state = {
				status: status,
				students: student_statuses
			};
		} else if (status == 'CancelledByStudents') {
			state = {
				status
			};
		} else if (status == 'StudentsMissing') {
			state = {
				status
			};
		} else if (status == 'CancelledByTutor') {
			state = {
				status
			};
		} else if (status == 'Holidays') {
			state = {
				status
			};
		} else {
			state = {
				status: 'Other'
			};
		}

		let req: CreateEntry = {
			index: entry[0],
			state
		};

		let res = await fetch(`/entries/${timeslot.id}/create`, {
			method: 'POST',
			body: JSON.stringify([timeslot.id, req]),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (res.status != 200) {
			throw new Error('Something bad happened');
		}

		invalidate('app:entries');
	}
</script>

<form
	on:submit|preventDefault={handle_submit}
	bind:this={form}
	class="bg-sky-400 p-4 rounded-md lg:w-2/3"
>
	<label>
		Status:
		<select name="status" bind:value={status} class="rounded p-1" required={true}>
			<option value="Success">Success</option>
			<option value="CancelledByStudents">Cancelled By Student(s)</option>
			<option value="StudentsMissing">All Students Missing</option>
			<option value="CancelledByTutor">Cancelled By Tutor</option>
			<option value="Holidays">Holidays</option>
			<option value="Other">Other</option>
		</select>
	</label>
	{#if status == 'Success'}
		<h3 class="text-xl font-semibold">Students:</h3>
		<div id="student_states">
			{#each timeslot.students as student}
				<div class="flex flex-row gap-1">
					<h4 class="text-lg font-light">{student.name}:</h4>
					<select name={student.name} class="rounded p-1" required={true}>
						<option>Present</option>
						<option>Pardoned</option>
						<option>Missing</option>
					</select>
				</div>
			{/each}
		</div>
	{:else}
		<span class="block">{status}</span>
	{/if}
	<button type="submit" class="bg-slate-500 rounded-md p-1 mt-2">Submit</button>
</form>
