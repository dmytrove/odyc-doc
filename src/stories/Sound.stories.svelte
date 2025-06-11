<script module>
	import { Sound } from '$lib'
	import { defineMeta } from '@storybook/addon-svelte-csf'

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Ui/Sound',
		component: Sound,
		tags: ['autodocs'],
		argTypes: {},
	})
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Primary" asChild>
	<div class="flex h-screen items-center justify-center">
		<div class="border border-gray-200">
			<Sound />
		</div>
	</div>
</Story>
