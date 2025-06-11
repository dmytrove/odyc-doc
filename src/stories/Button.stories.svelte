<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import { Button } from '$lib'
	import { Icon } from '@steeze-ui/svelte-icon'
	import { Check } from '@steeze-ui/lucide-icons'

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Ui/Button',
		component: Button,
		tags: ['autodocs'],
		argTypes: {},
	})
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Default" asChild>
	<div class="p-8">
		<Button>Default</Button>
	</div>
</Story>

<Story name="Ghost" asChild>
	<div class="p-8">
		<Button variant="ghost">Ghost</Button>
	</div>
</Story>

<Story name="Small" asChild>
	<div class="p-8">
		<Button size="sm">Small</Button>
	</div>
</Story>

<Story name="Large" asChild>
	<div class="p-8">
		<Button size="lg">Large</Button>
	</div>
</Story>

<Story name="With Icon" asChild>
	<div class="p-8">
		<Button size="icon" tooltip={{ text: 'coucou', placement: 'right' }}>
			<Icon src={Check} />
		</Button>
	</div>
</Story>
