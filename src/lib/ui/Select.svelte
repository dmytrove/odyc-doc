<script lang="ts">
	import type { Snippet } from 'svelte'
	import type { HTMLSelectAttributes } from 'svelte/elements'
	import { twMerge } from 'tailwind-merge'
	type Props = {
		children: Snippet
		class?: string
	} & HTMLSelectAttributes

	let { children, class: className, ...props }: Props = $props()
</script>

<select
	class={twMerge(
		'w-52 cursor-pointer rounded border border-gray-200 bg-transparent px-2 py-2 text-sm text-gray-700 hover:border-gray-400 focus:border-gray-400 focus:shadow-md focus:outline-none dark:border-gray-800 dark:text-gray-300 dark:hover:border-gray-700 dark:hover:text-gray-100',
		className ?? ''
	)}
	{...props}
>
	{@render children()}
</select>
