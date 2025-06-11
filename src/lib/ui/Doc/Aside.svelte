<script lang="ts">
	import { page } from '$app/state'
	import { useTranslations } from '$lib/i18n'
	import type { IconSource } from '@steeze-ui/heroicons'
	import { Lightbulb, MessageCircleWarning } from '@steeze-ui/lucide-icons'
	import { Icon } from '@steeze-ui/svelte-icon'
	import type { Snippet } from 'svelte'
	import { twMerge } from 'tailwind-merge'

	type AsideVariant = 'Note' | 'Warning'

	const icons: Record<AsideVariant, IconSource> = {
		Note: Lightbulb,
		Warning: MessageCircleWarning,
	}

	const variantsClasses: Record<AsideVariant, string> = {
		Note: 'border-indigo-500 bg-indigo-100 dark:bg-indigo-900/40 ',
		Warning: 'border-red-500 bg-red-100 dark:bg-red-900/40 ',
	}
	type Props = { children: Snippet; variant?: AsideVariant }

	let { children, variant = 'Note' }: Props = $props()
	const t = useTranslations(page.params.lang)
	//@ts-ignore
	const title = t(`doc.${variant.toLowerCase()}`)
</script>

<div class={twMerge('!mt-[2em] border-l-6 px-4 py-4 leading-snug', variantsClasses[variant])}>
	<p class="not-prose flex items-center gap-2 text-xl font-bold">
		<Icon src={icons[variant]} class="size-8" />
		{title}
	</p>
	<div class="prose mt-4">
		{@render children()}
	</div>
</div>
