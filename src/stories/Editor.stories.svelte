<script module>
	import { Editor } from '$lib'
	import { defineMeta } from '@storybook/addon-svelte-csf'

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'ui/Editor',
		component: Editor,
		tags: ['autodocs'],
		argTypes: {
			code: { control: 'text' },
			withVim: { control: 'boolean', defaultValue: false }
		}
	})
</script>

<Story name="Primary" args={{ withVim: false, code: `const hello = "world"`, class: 'h-screen' }} />

<Story name="With Vim" args={{ withVim: true, code: `const hello = "world"`, class: 'h-screen' }} />
