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
		'bg-base-100 text-base-content hover:border-border border-border/60 ring-ring w-52 cursor-pointer rounded border px-2 py-2 pr-10 text-sm text-ellipsis focus:ring-1',
		className ?? ''
	)}
	{...props}
>
	{@render children()}
</select>
