<script lang="ts">
	import { onMount } from 'svelte'
	import { twMerge } from 'tailwind-merge'

	export type Props = {
		defaultShortcut: string
		macShortcut?: string
		class?: string
	}

	let { defaultShortcut, macShortcut, class: className = '' }: Props = $props()

	let content = $state(defaultShortcut)

	onMount(() => {
		if (macShortcut && /Mac|iPhone|iPod|iPad/i.test(navigator.platform)) {
			content = macShortcut
		}
	})
</script>

<kbd class={twMerge('text-base-fade font-sans text-xs/4', className)}>{content}</kbd>
