<script lang="ts">
	import { buildGame } from '$lib/gameCode'
	import { twMerge } from 'tailwind-merge'
	export type Props = {
		code?: string
		class?: string
	}
	let { code = $bindable(''), class: className = '' }: Props = $props()
	let iframe: HTMLIFrameElement

	export function requestFullscreen() {
		iframe.requestFullscreen()
		iframe.focus()
	}

	export function refresh() {
		iframe.srcdoc = buildGame(code)
	}

	$effect(() => {
		iframe.srcdoc = buildGame(code)
	})
</script>

<iframe
	src=""
	frameborder="0"
	class={twMerge('h-full w-full', className)}
	title="game"
	bind:this={iframe}
></iframe>
