<script lang="ts">
	import { Tooltip } from '$lib';
	import type { Placement } from '@popperjs/core';
	import { Icon, type IconSource } from 'svelte-hero-icons';
	import { twMerge } from 'tailwind-merge';

	type Props = {
		icon: IconSource;
		label?: string;
		onclick?: () => void;
		tooltipPlacement?: Placement;
		class?: string;
	};

	let { icon, onclick, label, tooltipPlacement, class: className }: Props = $props();
</script>

<button
	class={twMerge(
		'cursor-pointer rounded-xs bg-gray-50 p-1.5 text-gray-700 ring ring-gray-200 hover:text-black hover:ring-gray-300 dark:bg-gray-950 dark:text-gray-200 dark:ring-gray-700 dark:hover:text-white dark:hover:ring-gray-600',
		className
	)}
	aria-label={label}
	{onclick}
>
	<Icon src={icon} class="size-5" />
</button>
{#if label}
	<Tooltip text={label} placement={tooltipPlacement} />
{/if}
