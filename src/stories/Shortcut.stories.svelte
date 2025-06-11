<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import { Button, Shortcut } from '$lib'
	import { Icon } from '@steeze-ui/svelte-icon'
	import { Check } from '@steeze-ui/lucide-icons'

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Ui/Shortcut',
		component: Shortcut,
		tags: ['autodocs'],
		argTypes: {}
	})
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Default" asChild>
	<div class="p-8">
		<Shortcut defaultShortcut="ctrl V" macShortcut="⌘ v" />
	</div>
</Story>
