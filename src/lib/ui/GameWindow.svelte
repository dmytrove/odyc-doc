<script lang="ts">
	import { page } from '$app/state'
	import { buildGame } from '$lib/gameCode'
	import { useTranslations } from '$lib/i18n'
	import { Camera, Fullscreen, Video } from '@steeze-ui/lucide-icons'
	import { Icon } from '@steeze-ui/svelte-icon'
	import { twMerge } from 'tailwind-merge'
	import Tooltip from './Tooltip.svelte'
	import { onMount } from 'svelte'

	export type Props = {
		code?: string
		class?: string
	}

	let isRecording = $state(false)
	const t = useTranslations(page.params.lang)
	let { code = $bindable(''), class: className = '' }: Props = $props()
	let iframe: HTMLIFrameElement

	let messageChannel: MessageChannel

	onMount(() => {
		iframe.onload = () => {
			messageChannel = new MessageChannel()
			iframe.contentWindow?.postMessage({ type: 'init' }, '*', [messageChannel.port2])
			messageChannel.port1.onmessage = (e) => handleMessage(e)
		}
	})

	function requestFullscreen() {
		iframe?.requestFullscreen()
		iframe?.focus()
	}

	function requestScreenshot() {
		messageChannel.port1.postMessage({
			type: 'screenshot',
			filename: t('gamewindow.screenshotName'),
		})
	}

	function requestRecord() {
		const type = isRecording ? 'stop-record' : 'start-record'
		messageChannel.port1.postMessage({ type, filename: t('gamewindow.recordName') })
		if (!isRecording) iframe.focus()
	}

	export function refresh() {
		if (iframe) iframe.srcdoc = buildGame(code)
	}

	$effect(() => {
		if (iframe) iframe.srcdoc = buildGame(code)
	})

	function handleMessage(e: MessageEvent) {
		if (e.data.type === 'start-record') {
			isRecording = true
		} else if (e.data.type === 'stop-record') {
			isRecording = false
		}
	}
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
		class="ring-ring absolute top-4 right-24 cursor-pointer p-1 opacity-80 mix-blend-difference hover:opacity-100 focus:ring-1"
		onclick={requestRecord}
	>
		<Icon src={Video} class="size-5 text-white" />
		{#if isRecording}
			<span
				class="absolute top-0 right-0 isolate inline-flex size-2 animate-ping rounded-full bg-[rgb(4,191,201)]"
			></span>
		{/if}
	</button>
	<Tooltip text={t('gamewindow.record')} placement="bottom-end" />

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
