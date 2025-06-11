<script module>
	import { SelectLanguage } from '$lib'
	import { defineMeta } from '@storybook/addon-svelte-csf'

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Ui/SelectLanguage',
		component: SelectLanguage,
		tags: ['autodocs'],
		argTypes: {}
	})

	const items = [
		{ lang: 'english', url: '#' },
		{ lang: 'français', url: '#' }
	]
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Primary" asChild>
	<div class="flex justify-end p-8">
		<SelectLanguage {items} />
	</div>
</Story>
