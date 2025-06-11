import LightWrapperDecorator from '../src/stories/decorators/LightWrapperDecorator.svelte'
import DarkWrapperDecorator from '../src/stories/decorators/DarkWrapperDecorator.svelte'
import type { Preview } from '@storybook/svelte'
import '@fontsource-variable/pixelify-sans'
import '../src/app.css'

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		},
		layout: 'fullscreen'
	},
	globalTypes: {
		theme: {
			description: 'Global theme for components',
			toolbar: {
				// The label to show for this toolbar item
				title: 'Theme',
				icon: 'mirror',
				// Array of plain string values or MenuItem shape (see below)
				items: ['light', 'dark'],
				// Change title based on selected value
				dynamicTitle: true
			}
		}
	},
	initialGlobals: {
		theme: 'light'
	},
	decorators: [
		(_, ctx) => (ctx.globals.theme === 'dark' ? DarkWrapperDecorator : LightWrapperDecorator)
	]
}

export default preview
