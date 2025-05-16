<script module>
	import { Select } from '$lib'
	import { defineMeta } from '@storybook/addon-svelte-csf'

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Ui/Select',
		component: Select,
		tags: ['autodocs'],
		argTypes: {}
	})
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Primary" asChild>
	<div class="flex h-screen items-center justify-center">
		<Select>
			<option selected>Choose a country</option>
			<option value="US">United States</option>
			<option value="CA">Canada</option>
			<option value="FR">France</option>
			<option value="DE">Germany</option>
		</Select>
	</div>
</Story>
