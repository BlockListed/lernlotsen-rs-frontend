<script lang="ts">
	interface Range<T> {
		start: T;
		end: T;
	}

	interface Student {
		name: string;
	}

	interface Timeslot {
		id: string;
		subject: string;
		students: Student[];
		time: Range<string>;
		timerange: Range<string>;
		weekday: string;
	}

	export let timeslot: Timeslot;
</script>

<div class="bg-teal-400 w-2/3 rounded-md p-4 my-2">
	<h1 class="text-2xl font-semibold">{timeslot.subject}</h1>
	<div class="flex flex-col">
		<div>Weekday: <strong>{timeslot.weekday}</strong></div>
		<div>Start: <strong>{timeslot.time.start}</strong></div>
		<div>End: <strong>{timeslot.time.end}</strong></div>
		<div>Contract: <strong> {timeslot.timerange.start} - {timeslot.timerange.end} </strong></div>
	</div>
	<h2 class="text-2xl font-semibold">Students</h2>
	<ul class="list-inside list-disc">
		{#each timeslot.students as student}
			<li>{student.name}</li>
		{/each}
	</ul>
</div>
