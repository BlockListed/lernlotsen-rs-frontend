export interface Range<T> {
	start: T;
	end: T;
}

export interface Student {
	name: string;
}

export interface Timeslot {
	id: string;
	subject: string;
	students: Student[];
	time: Range<string>;
	timerange: Range<string>;
	weekday: string;
}

export interface SuccessState {
	Success: [Student, string];
}

export interface Entry {
	index: number;
	timeslot_id: string;
	state: string | SuccessState;
}