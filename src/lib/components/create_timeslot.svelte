<script lang="ts">
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';

	import { fly } from 'svelte/transition';

	export let visible: boolean;

	let student_inputs: string[] = [];

	onMount(() => {
		add_student_input();
	})

	function add_student_input() {
		if (student_inputs.length >= 5) return

		const new_name = `student-${student_inputs.length}`

		student_inputs = [...student_inputs, new_name];
	}

	function remove_student_input() {
		if (student_inputs.length <= 1) return

		student_inputs = student_inputs.slice(0, student_inputs.length - 1)
	}
</script>

{#if visible}
<form transition:fly={{ x: 200, duration: 200 }} use:enhance method="POST" action="?/create" class="flex flex-col bg-slate-300 p-6 rounded-md w-2/3">
	<div class="flex flex-row">
		<div class="flex flex-col mx-2">
			<label class="mb-1.5">
				<input type="text" name="subject" class="rounded" />
				Subject
			</label>
			<label class="mb-1.5">
				<select name="weekday">
					<option value="mon">Monday</option>
					<option value="tue">Tuesday</option>
					<option value="wed">Wednesday</option>
					<option value="thu">Thursday</option>
					<option value="fri">Friday</option>
					<option value="sat">Saturday</option>
					<option value="sun">Sunday</option>
				</select>
				Weekday
			</label>
			<label class="mb-1.5">
				<input type="time" name="time-start" class="rounded" />
				Start Time
			</label>
			<label class="mb-1.5">
				<input type="time" name="time-end" class="rounded" />
				End Time
			</label>
			<label class="mb-1.5">
				<input type="date" name="date-start" class="rounded" />
				Start Date
			</label>
			<label class="mb-1.5">
				<input type="date" name="date-end" class="rounded" />
				End Date
			</label>
		</div>
		<div class="flex flex-col mx-2">
			{#each student_inputs as name, i}
				<label>
					<input type="text" class="mb-1.5 rounded" {name} />
					Student {i+1}
				</label>
			{/each}
		</div>
	</div>
	<div class="grid grid-cols-2">
		<button on:click|preventDefault={add_student_input} class="bg-slate-500 rounded-md m-2">Add student field</button>
		<button on:click|preventDefault={remove_student_input} class="bg-slate-500 rounded-md m-2">Remove student field</button>
	</div>
	<button class="bg-slate-500 rounded-md m-2">Submit</button>
</form>
{/if}