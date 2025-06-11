<script lang="ts">
	import type { Snippet } from 'svelte'
	import { twMerge } from 'tailwind-merge'
	import type { Props as TooltipProps } from '$lib/ui/Tooltip.svelte'
	import { Tooltip } from '$lib'
	import type { HTMLButtonAttributes } from 'svelte/elements'

	const classVariants = {
		default:
			'bg-base-200 border border-border/60 hover:border-border hover:bg-base-300 ring-ring focus:ring-1',
		ghost: 'hover:bg-base-200',
	}

	const classSizes = {
		default: 'h-9 px-4 py-2',
		sm: 'h-8  px-3 text-xs',
		lg: 'h-10 px-8',
		icon: 'h-9 w-9',
	}

	type Props = {
		children: Snippet
		variant?: keyof typeof classVariants
		size?: keyof typeof classSizes
		label?: string
		tooltip?: TooltipProps
		onclick?: () => void
		class?: string
	} & HTMLButtonAttributes

	let {
		children,
		variant = 'default',
		size = 'default',
		tooltip,
		label,
		onclick,
		class: className,
		...props
	}: Props = $props()
</script>

<button
	class={twMerge(
		'text-base-content/80 hover:text-base-content inline-flex cursor-pointer items-center justify-center  gap-2 rounded-xs text-sm font-medium whitespace-nowrap focus:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
		classSizes[size],
		classVariants[variant],
		className
	)}
	aria-label={label ?? tooltip?.text}
	{onclick}
	{...props}
>
	{@render children()}
</button>
{#if tooltip}
	<Tooltip {...tooltip} />
{/if}
