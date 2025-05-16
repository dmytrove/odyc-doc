<script module>
	import { Playground } from '$lib';
	import { defineMeta } from '@storybook/addon-svelte-csf';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Ui/Playground',
		component: Playground,
		tags: ['autodocs'],
		argTypes: {}
	});
</script>

<Story name="Primary" args={{ class: 'h-screen' }} />
