export function clamp(n: number, min: number, max: number): number {
	return Math.min(Math.max(n, min), max);
}

export function hide_dialog(e: MouseEvent, ele: HTMLDialogElement) {
	const rect = ele.getBoundingClientRect();

	const in_box = e.x > rect.left && e.x < rect.right && e.y > rect.top && e.y < rect.bottom;

	if (!in_box) {
		ele.close();
	}
}