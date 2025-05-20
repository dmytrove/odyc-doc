<script lang="ts">
	import { page } from '$app/state'
	import { buildGame } from '$lib/gameCode'
	import { useTranslations } from '$lib/i18n'
	import { Expand, Camera, Fullscreen } from '@steeze-ui/lucide-icons'
	import { Icon } from '@steeze-ui/svelte-icon'
	import { twMerge } from 'tailwind-merge'
	import Tooltip from './Tooltip.svelte'
	export type Props = {
		code?: string
		class?: string
	}
	const t = useTranslations(page.params.lang)
	let { code = $bindable(''), class: className = '' }: Props = $props()
	let iframe: HTMLIFrameElement | undefined = $state()

	function requestFullscreen() {
		iframe?.requestFullscreen()
		iframe?.focus()
	}

	function requestScreenshot() {
		iframe?.contentWindow?.postMessage(
			{ type: 'screenshot', filename: t('gamewindow.screenshotName') },
			'*'
		)
	}

	export function refresh() {
		if (iframe) iframe.srcdoc = buildGame(code)
	}

	$effect(() => {
		if (iframe) iframe.srcdoc = buildGame(code)
	})
</script>

<div class="relative">
	<iframe
		src=""
		frameborder="0"
		class={twMerge('h-full w-full bg-white', className)}
		title="game"
		bind:this={iframe}
	></iframe>

	<button
		class="ring-ring absolute top-4 right-14 cursor-pointer p-1 opacity-80 mix-blend-difference hover:opacity-100 focus:ring-1"
		onclick={requestScreenshot}
	>
		<Icon src={Camera} class="size-5 text-white" />
	</button>
	<Tooltip text={t('gamewindow.screenshot')} placement="bottom-end" />

	<button
		class="ring-ring absolute top-4 right-4 cursor-pointer p-1 opacity-80 mix-blend-difference hover:opacity-100 focus:ring-1"
		onclick={requestFullscreen}
	>
		<Icon src={Fullscreen} class="size-5 text-white" />
	</button>
	<Tooltip text={t('gamewindow.fullscreen')} placement="bottom-start" />
</div>
