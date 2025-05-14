<script module>
	import { Switch } from '$lib';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { MagnifyingGlass } from 'svelte-hero-icons';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Ui/Switch',
		component: Switch,
		tags: ['autodocs'],
		argTypes: {}
	});
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Primary" asChild>
	<div class="m-2">
		<Switch label="toggle me" />
	</div>
</Story>
