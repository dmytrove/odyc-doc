<script lang="ts">
	import type { IconSource } from '@steeze-ui/heroicons'
	import { Lightbulb, MessageCircleWarning } from '@steeze-ui/lucide-icons'
	import { Icon } from '@steeze-ui/svelte-icon'
	import type { Snippet } from 'svelte'
	import { twMerge } from 'tailwind-merge'

	type AsideVariant = 'Note' | 'Warning'

	const icons: Record<AsideVariant, IconSource> = {
		Note: Lightbulb,
		Warning: MessageCircleWarning
	}

	const variantsClasses: Record<AsideVariant, string> = {
		Note: 'border-indigo-300 bg-indigo-600/10',
		Warning: 'border-danger-border bg-danger-surface text-danger-content'
	}
	type Props = { children: Snippet; variant?: AsideVariant }

	let { children, variant = 'Note' }: Props = $props()
</script>

<div class={twMerge('!mt-[2em] border-l-6 px-4 py-4 leading-snug', variantsClasses[variant])}>
	<p class="not-prose flex items-center gap-2 text-xl font-bold">
		<Icon src={icons[variant]} class="size-8" />
		{variant}
	</p>
	<div class="prose mt-4">
		{@render children()}
	</div>
</div>
