<script lang="ts">
	import dayjs from 'dayjs';
	import isoWeek from 'dayjs/plugin/isoWeek';

	dayjs.extend(isoWeek);

	import { clamp } from '$lib/util';
	import type { Timeslot } from '$lib/types';

	export let timeslots: Timeslot[];

	let start_year: number = dayjs().year();
	let start_week: number = default_start_week();

	let end_year: number = dayjs().year();
	let end_week: number = dayjs().isoWeek();

	function default_start_week(): number {
		let default_start_week = timeslots.reduce((acc, ts) => {
			let date = dayjs(ts.timerange.start);
			return dayjs().diff(date, 'years') < 1 ? Math.min(acc, date.isoWeek()) : acc;
		}, 100); // 100 is a sentinel value.
		if (default_start_week == 100) {
			default_start_week = 1;
		}

		return default_start_week;
	}

	function createLink(start_year: number, start_week: number, end_year: number, end_week: number): string {
		let clean_start_year: Number = start_year || dayjs().year();
		// Years can have 53 weeks.
		let clean_start_week = clamp(start_week || default_start_week(), 1, 53);
		let clean_end_year = end_year || dayjs().year();
		let clean_end_week = clamp(end_week || 1, 1, 53);

		let search_params = new URLSearchParams({
			start_year: clean_start_year.toString(),
			start_week: clean_start_week.toString(),
			end_year: clean_end_year.toString(),
			end_week: clean_end_week.toString(),
		});

		return `/export?${search_params.toString()}`
	}

	$: link = createLink(start_year, start_week, end_year, end_week);
</script>

<div class="flex flex-col">
	<div class="flex flex-row">
		<div class="flex flex-col space-y-4">
			<label>
				Start Year:
				<input type="number" bind:value={start_year} />
			</label>

			<label>
				Start Week:
				<input type="number" bind:value={start_week} />
			</label>
		</div>

		<div class="flex flex-col space-y-4">
			<label>
				End Year:
				<input type="number" bind:value={end_year} />
			</label>

			<label>
				End Week:
				<input type="number" bind:value={end_week} />
			</label>
		</div>
	</div>

	<a href={link} data-sveltekit-preload-data="off">
		{link}
	</a>
</div>
