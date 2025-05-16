<script lang="ts">
	import { Button, Dialog, Editor, GameWindow, Paint, Select, Sound, Switch } from '$lib'
	import { SplitPane } from '@rich_harris/svelte-split-pane'
	import {
		ArrowPath,
		ArrowsPointingOut,
		CodeBracket,
		Icon,
		MusicalNote,
		PaintBrush,
		Wrench
	} from 'svelte-hero-icons'
	import { twMerge } from 'tailwind-merge'
	import { formatJs } from './formater'
	import ExampleSelect from './ExampleSelect.svelte'

	type Props = {
		class?: string
	}

	let { class: className = '' }: Props = $props()

	// svelte-ignore non_reactive_update
	let gameWindow: GameWindow
	let settingsIsOpen = $state(false)
	let paintSrc: string | undefined = $state()
	let paintIsOpen = $state(false)
	let soundIsOpen = $state(false)
	let withVim = $state(false)
	let autoRefresh = $state(true)
	let code = $state(`
 createGame({
  player:{
    sprite:\`
    ...00...
    ...00...
    .000000.
    0.0000.0
    0.0000.0
    0.0000.0
    ..0..0..
    ..0..0..
    \`,
    position:[1,1]
  },
  background: 7,
})
`)

	// svelte-ignore state_referenced_locally
	let iframeCode = $state(code)

	$effect(() => {
		if (autoRefresh) iframeCode = code
	})

	function formatCode() {
		code = formatJs(code)
	}

	function openPaint() {
		const selectedTxt = getSelection()?.toString()
		if (selectedTxt) paintSrc = selectedTxt
		paintIsOpen = true
	}
</script>

<div class={twMerge('playground  flex h-full flex-col shadow dark:bg-gray-900', className)}>
	<header
		class="flex items-center justify-between gap-2 border-b border-gray-200 px-4 py-2 dark:border-gray-700"
	>
		<div class="flex items-center gap-2">
			<Button
				size="icon"
				tooltip={{ text: 'Refresh' }}
				onclick={() => {
					iframeCode = code
					gameWindow.refresh()
				}}
			>
				<Icon src={ArrowPath} />
			</Button>

			<Button size="icon" tooltip={{ text: 'Format code' }} onclick={formatCode}>
				<Icon src={CodeBracket} />
			</Button>

			<Button size="icon" tooltip={{ text: 'Paint' }} onclick={openPaint}>
				<Icon src={PaintBrush} />
			</Button>

			<Button size="icon" tooltip={{ text: 'Sound' }} onclick={() => (soundIsOpen = true)}>
				<Icon src={MusicalNote} />
			</Button>

			<Button
				size="icon"
				tooltip={{ text: 'Editor settings' }}
				onclick={() => (settingsIsOpen = true)}
			>
				<Icon src={Wrench} />
			</Button>
		</div>

		<div class="flex items-center gap-2">
			<ExampleSelect onChange={(newCode) => (code = newCode)} />
		</div>

		<div class="flex items-center gap-2">
			<Button size="icon" tooltip={{ text: 'Fullscreen' }} onclick={gameWindow?.requestFullscreen}>
				<Icon src={ArrowsPointingOut} />
			</Button>
		</div>
	</header>
	<div class="h-full min-h-0 grow">
		<SplitPane type="horizontal" --color="var(--separator)" min="10%" max="90%">
			{#snippet a()}
				<Editor bind:content={code} {withVim} />
			{/snippet}
			{#snippet b()}
				<GameWindow class="" code={iframeCode} bind:this={gameWindow} />
			{/snippet}
		</SplitPane>
	</div>
</div>

<Dialog bind:open={paintIsOpen}>
	<Paint src={paintSrc} />
</Dialog>

<Dialog bind:open={soundIsOpen}>
	<Sound />
</Dialog>

<Dialog bind:open={settingsIsOpen}>
	<form class="grid min-w-xs gap-4 p-8">
		<Switch label="Vim Mode" class="justify-between" bind:checked={withVim} />
		<Switch label="Auto-refresh" class="justify-between" bind:checked={autoRefresh} />
	</form>
</Dialog>

<style>
	.playground {
		--separator: var(--color-gray-200);
	}
	:global(.dark .playground) {
		--separator: var(--color-gray-700);
	}
</style>
