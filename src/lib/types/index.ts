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
	status: "Success";
	students: [Student, string][]
}

export interface CancelledByStudents {
	status: "CancelledByStudents"
}

export interface CancelledByTutor {
	status: "CancelledByTutor"
}

export interface Holidays {
	status: "Holidays"
}

export interface Other {
	status: "Other"
}

export interface Entry {
	index: number;
	timeslot_id: string;
	state: SuccessState | CancelledByStudents | CancelledByTutor | Holidays | Other
}
