<script lang="ts">
	import type { Snippet } from 'svelte';
	import { twMerge } from 'tailwind-merge';
	import type { Props as TooltipProps } from '$lib/ui/Tooltip.svelte';
	import { Tooltip } from '$lib';

	const classVariants = {
		default:
			'bg-gray-50 ring ring-gray-200 hover:ring-gray-300 dark:hover:ring-gray-600 dark:bg-gray-950  dark:ring-gray-700 dark:hover:bg-gray-900',
		ghost: 'hover:bg-gray-100 dark:hover:bg-gray-900'
	};

	const classSizes = {
		default: 'h-9 px-4 py-2',
		sm: 'h-8  px-3 text-xs',
		lg: 'h-10 px-8',
		icon: 'h-9 w-9'
	};

	type Props = {
		children: Snippet;
		variant?: keyof typeof classVariants;
		size?: keyof typeof classSizes;
		label?: string;
		tooltip?: TooltipProps;
		onclick?: () => void;
		class?: string;
	};

	let {
		children,
		variant = 'default',
		size = 'default',
		tooltip,
		label,
		onclick,
		class: className
	}: Props = $props();
</script>

<button
	class={twMerge(
		'inline-flex cursor-pointer items-center justify-center gap-2 rounded-xs  text-sm font-medium whitespace-nowrap text-gray-700  transition-colors hover:text-black  focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 dark:text-gray-200 dark:hover:text-white [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
		classSizes[size],
		classVariants[variant],
		className
	)}
	aria-label={label ?? tooltip?.text}
	{onclick}
>
	{@render children()}
</button>
{#if tooltip}
	<Tooltip {...tooltip} />
{/if}
