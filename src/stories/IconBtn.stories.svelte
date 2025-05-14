<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { IconBtn } from '$lib';
	import { MagnifyingGlass } from 'svelte-hero-icons';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Ui/IconBtn',
		component: IconBtn,
		tags: ['autodocs'],
		argTypes: {}
	});
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story
	name="Primary"
	args={{
		icon: MagnifyingGlass,
		label: 'Magnifying Glass',
		toolTipPlacement: 'bottom',
		onclick: () => alert('ok')
	}}
/>
