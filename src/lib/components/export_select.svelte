<script lang="ts">
	import { page } from '$app/stores';
	import dayjs from 'dayjs';
	import isoWeek from 'dayjs/plugin/isoWeek';

	dayjs.extend(isoWeek);

	import { clamp } from '$lib/util';
	import type { Timeslot } from '$lib/types';
	import { goto } from '$app/navigation';

	export let timeslots: Timeslot[];

	let start_year: number = parseInt(
		$page.url.searchParams.get('start_year') || default_start_year().toString()
	);
	let start_week: number = parseInt(
		$page.url.searchParams.get('start_week') || default_start_week().toString()
	);

	let end_year: number = parseInt(
		$page.url.searchParams.get('end_year') || dayjs().year().toString()
	);
	let end_week: number = parseInt(
		$page.url.searchParams.get('end_week') || dayjs().isoWeek().toString()
	);

	let allow_incomplete: boolean = $page.url.searchParams.get('allow_incomplete') === 'true';

	function default_start_week(): number {
		let default_start_week = timeslots.reduce((acc, ts) => {
			let date = dayjs(ts.timerange.start);
			return dayjs().diff(date, 'years') < 1 ? Math.min(acc, date.isoWeek()) : acc;
		}, 100); // 100 is a sentinel value.
		if (default_start_week === 100) {
			default_start_week = 1;
		}

		return default_start_week;
	}

	function default_start_year(): number {
		let default_start_year = timeslots.reduce((acc, ts) => {
			let date = dayjs(ts.timerange.start);
			return date.year();
		}, 4000); // 4000 is a sentinel value.
		if (default_start_year === 4000) {
			default_start_year = dayjs().year();
		}

		return default_start_year;
	}

	function createLink(
		start_year: number,
		start_week: number,
		end_year: number,
		end_week: number,
		allow_incomplete: boolean
	): string {
		let clean_start_year: number = start_year || dayjs().year();
		// Years can have 53 weeks.
		let clean_start_week = clamp(start_week || default_start_week(), 1, 53);
		let clean_end_year = end_year || dayjs().year();
		let clean_end_week = clamp(end_week || 1, 1, 53);

		let search_params = new URLSearchParams({
			start_year: clean_start_year.toString(),
			start_week: clean_start_week.toString(),
			end_year: clean_end_year.toString(),
			end_week: clean_end_week.toString(),
			allow_incomplete: allow_incomplete.toString()
		});

		return `/export?${search_params.toString()}`;
	}

	$: link = createLink(start_year, start_week, end_year, end_week, allow_incomplete);

	function submit(e: KeyboardEvent) {
		if (e.key == 'Enter') {
			goto(link);
		}
	}
</script>

<div class="flex flex-col bg-sky-400 p-4 rounded-md space-y-4" on:keypress={submit} role="form">
	<div class="flex flex-col md:flex-row space-x-4 md:space-y-0 space-y-4">
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

		<label>
			Allow Incomplete Export:
			<input type="checkbox" bind:checked={allow_incomplete} />
		</label>
	</div>

	<a href={link} data-sveltekit-preload-data="off" class="bg-slate-400">
		{link}
	</a>
</div>
