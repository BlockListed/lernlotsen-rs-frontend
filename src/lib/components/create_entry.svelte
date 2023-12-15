<script lang="ts">
	import { invalidate } from '$app/navigation';
	import type {
		StudentState,
		StudentStatus,
		Timeslot,
		CreateEntry,
		EntryState,
		UnfilledEntry
	} from '$lib/types';

	export let timeslot: Timeslot;
	export let entry: UnfilledEntry;

	let form: HTMLFormElement;

	let status: string;

	let form_error: string | undefined;

	function verify(state: EntryState, students: StudentState[]): boolean {
		const present_count = students.reduce((acc, state) => {
			if (state.status == 'Present') {
				return acc + 1;
			} else {
				return acc;
			}
		}, 0);

		const pardoned_count = students.reduce((acc, state) => {
			if (state.status == 'Pardoned') {
				return acc + 1;
			} else {
				return acc;
			}
		}, 0);

		const missing_count = students.reduce((acc, state) => {
			if (state.status == 'Missing') {
				return acc + 1;
			} else {
				return acc;
			}
		}, 0);

		if (state == 'Success' && present_count == 0) {
			form_error =
				'No students are present, which would imply either CancelledByStudents or StudentsMissing!';
			return false;
		}

		if (state == 'CancelledByStudents' && (present_count != 0 || pardoned_count == 0)) {
			form_error =
				'Either atleast 1 student is present when the entry has been cancelled or no students are pardoned, which would imply StudentsMissing!';
			return false;
		}

		if (
			state == 'StudentsMissing' &&
			(present_count != 0 || pardoned_count != 0 || missing_count == 0)
		) {
			form_error =
				'Either atleast 1 student is present or pardoned when all students are supposed to be missing.';
			return false;
		}

		return true;
	}

	async function handle_submit() {
		console.log('submitted');

		let student_states = form.querySelectorAll('#student_states select');

		let student_statuses: StudentState[] = [];

		student_states.forEach((s) => {
			const ele = s as HTMLSelectElement;

			let name = ele.getAttribute('name');

			if (!name) {
				throw new Error('Missing name attribute on select');
			}

			let value = ele.selectedOptions[0].value;

			student_statuses.push({ student: name, status: value as StudentStatus });
		});

		let state: EntryState = status as EntryState;

		if (!verify(state, student_statuses)) {
			return;
		} else {
			form_error = undefined;
		}

		let req: CreateEntry = {
			index: entry.index,
			students: student_statuses,
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
	{#if status == 'Success' || status == 'CancelledByStudents' || status == 'StudentsMissing'}
		<h3 class="text-xl font-semibold">Students:</h3>
		<div id="student_states">
			{#each timeslot.students as student}
				<div class="flex flex-row gap-1">
					<h4 class="text-lg font-light">{student}:</h4>
					<select name={student} class="rounded p-1" required={true}>
						{#if status == 'Success'}
							<option>Present</option>
						{/if}
						{#if status == 'Success' || status == 'CancelledByStudents'}
							<option>Pardoned</option>
						{/if}
						<option>Missing</option>
					</select>
				</div>
			{/each}
		</div>
	{:else}
		<span class="block">{status}</span>
	{/if}
	{#if form_error}
		<span class="block text-red-600 bg-yellow-900 font-semibold">{form_error}</span>
	{/if}
	<button type="submit" class="bg-slate-500 rounded-md p-1 mt-2">Submit</button>
</form>
