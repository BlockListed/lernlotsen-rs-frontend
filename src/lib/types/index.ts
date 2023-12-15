export interface Range<T> {
	start: T;
	end: T;
}

export type Student = string;

export interface Timeslot {
	id: string;
	subject: string;
	students: Student[];
	time: Range<string>;
	timerange: Range<string>;
	weekday: string;
	timezone: string;
}

export type StudentStatus = 'Present' | 'Pardoned' | 'Missing';

export interface StudentState {
	student: string;
	status: StudentStatus;
}

export type EntryState =
	| 'Success'
	| 'CancelledByStudents'
	| 'StudentsMissing'
	| 'CancelledByTutor'
	| 'Holidays'
	| 'Other';

export interface Entry {
	index: number;
	timeslot_id: string;
	state: EntryState;
	students: StudentState[];
}

export interface CreateEntry {
	state: EntryState;
	students: StudentState[];
	index: number;
}

export interface EntryReturn {
	entry: Entry;
	timestamp: string | Date;
}

export interface UnfilledEntry {
	index: number;
	timestamp: string | Date;
}

export interface InformationV3Item {
	ts: Timeslot;
	next: UnfilledEntry;
	missing: number;
}

export type InformationV3 = InformationV3Item[];

export interface OidcData {
	auth_url: string;
	session_id: string;
}
