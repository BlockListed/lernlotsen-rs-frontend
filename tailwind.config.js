/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				back: '#d5b3fd',
				back2: '#bcc2e2',
				box: '#a0cec5',
				lowlight: '#7ed8a6',
				hightlight: '#4ce283'
			}
		}
	},
	plugins: []
};
