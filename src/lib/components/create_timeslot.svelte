<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	import { fly } from 'svelte/transition';

	export let visible: boolean;

	let student_inputs: string[] = [];

	onMount(() => {
		add_student_input();
	});

	function add_student_input() {
		if (student_inputs.length >= 5) return;

		const new_name = `student-${student_inputs.length}`;

		student_inputs = [...student_inputs, new_name];
	}

	function remove_student_input() {
		if (student_inputs.length <= 1) return;

		student_inputs = student_inputs.slice(0, student_inputs.length - 1);
	}

	// Yes, this does result in the current timezone being duplicated,
	// it exists once at the top and once at its correct place in the
	// list. It's now a feature not a bug.
	const timezones = [Intl.DateTimeFormat().resolvedOptions().timeZone].concat(
		Intl.supportedValuesOf('timeZone')
	);
</script>

{#if visible}
	<form
		transition:fly={{ x: 200, duration: 200 }}
		use:enhance={() => {
			return async ({ result, update }) => {
				if (result.type === 'success') {
					invalidate('app:timeslots');
				}
				await update();
			};
		}}
		method="POST"
		action="?/create"
		class="flex flex-col bg-sky-400 p-6 rounded-md lg:w-2/3"
	>
		<div class="flex md:flex-row flex-col">
			<div class="flex flex-col mx-2">
				<label class="mb-1.5">
					Subject:
					<input type="text" name="subject" class="rounded p-1" required={true} />
				</label>
				<label class="mb-1.5">
					Weekday:
					<select name="weekday" class="rounded p-1" required={true}>
						<option value="mon">Monday</option>
						<option value="tue">Tuesday</option>
						<option value="wed">Wednesday</option>
						<option value="thu">Thursday</option>
						<option value="fri">Friday</option>
						<option value="sat">Saturday</option>
						<option value="sun">Sunday</option>
					</select>
				</label>
				<label class="mb-1.5">
					Start Time:
					<input type="time" name="time-start" class="rounded p-1" required={true} />
				</label>
				<label class="mb-1.5">
					End Time:
					<input type="time" name="time-end" class="rounded p-1" required={true} />
				</label>
				<label class="mb-1.5">
					Start Date:
					<input type="date" name="date-start" class="rounded p-1" required={true} />
				</label>
				<label class="mb-1.5">
					End Date:
					<input type="date" name="date-end" class="rounded p-1" required={true} />
				</label>
				<label class="mb-1.5">
					Time Zone:
					<select name="timezone" class="rounded p-1 w-2/3" required={true}>
						{#each timezones as tz}
							<option value={tz}>{tz}</option>
						{/each}
					</select>
				</label>
			</div>
			<div class="flex flex-col mx-2">
				{#each student_inputs as name, i}
					<label>
						Student {i + 1}:
						<input type="text" class="mb-1.5 rounded p-1" {name} required={true} />
					</label>
				{/each}
			</div>
		</div>
		<div class="flex md:flex-row flex-col">
			<button
				on:click|preventDefault={add_student_input}
				class="grow bg-slate-500 rounded-md m-2 p-1">Add student field</button
			>
			<button
				on:click|preventDefault={remove_student_input}
				class="grow bg-slate-500 rounded-md m-2 p-1">Remove student field</button
			>
		</div>
		<button class="bg-slate-500 rounded-md m-2 py-1">Submit</button>
	</form>
{/if}
