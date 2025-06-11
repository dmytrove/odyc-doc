<script module>
	import { Playground } from '$lib'
	import { defineMeta } from '@storybook/addon-svelte-csf'

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Ui/Playground',
		component: Playground,
		tags: ['autodocs'],
		argTypes: {},
	})
	const code = `createGame({
	player: {
		sprite: \`
			...88...
			...88...
			.000000.
			0.0000.0
			8.0000.8
			..3333..
			..3..3..
			..0..0..
			\`,
		position: [1, 1]
	},
	templates: {
		x: {
			sprite: 2
		}
	},
	map: \`
	xxxxxxxx
	x......x
	x......x
	x......x
	x......x
	x......x
	x......x
	xxxxxxxx
	\`
})
`
</script>

<Story name="Primary" args={{ class: 'h-screen', code }} />
