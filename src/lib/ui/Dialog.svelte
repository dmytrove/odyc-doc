<script lang="ts">
	import type { Snippet } from 'svelte'
	import { click_outside } from '../actions/clickOutside'
	import { twMerge } from 'tailwind-merge'

	export type Props = {
		open: boolean
		children: Snippet
		class?: string
	}

	let { open = $bindable(), children, class: className }: Props = $props()
	let dialogElement: HTMLDialogElement

	$effect(() => {
		if (dialogElement.open !== open) {
			if (open) dialogElement.showModal()
			else dialogElement.close()
		}
	})
</script>

<dialog
	bind:this={dialogElement}
	class="backdrop:bg-base-100/40 bg-base-100 fixed top-1/2 left-1/2 h-min -translate-1/2 backdrop:backdrop-blur-sm"
	onclose={() => (open = false)}
>
	<div
		use:click_outside={() => (open = false)}
		class={twMerge('bg:base-200 border-border text-base-content border', className)}
	>
		{@render children()}
	</div>
</dialog>
