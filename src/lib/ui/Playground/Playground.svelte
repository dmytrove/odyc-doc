<script lang="ts">
	import { page } from '$app/state'
	import {
		Button,
		Dialog,
		Editor,
		GameWindow,
		MapEditor,
		Paint,
		Sound,
		Switch,
		useTranslations
	} from '$lib'
	import { buildGame, parseCode } from '$lib/gameCode'
	import { SplitPane } from '@rich_harris/svelte-split-pane'
	import { Icon } from '@steeze-ui/svelte-icon'
	import {
		Wrench,
		Save,
		FolderOpen,
		RefreshCw,
		Code,
		Brush,
		Music,
		Download,
		Map
	} from '@steeze-ui/lucide-icons'
	import { twMerge } from 'tailwind-merge'
	import type { Props as LoadExamplesProps } from './ExampleSelect.svelte'
	import ExampleSelect from './ExampleSelect.svelte'
	import { fade } from 'svelte/transition'
	import { Settings } from './Settings.svelte'

	type Props = {
		code?: string
		class?: string
		orientation?: 'vertical' | 'horizontal'
		examples?: LoadExamplesProps['examples']
		localStorageKey?: string
	}

	let {
		code = $bindable(''),
		orientation = 'horizontal',
		examples,
		localStorageKey,
		class: className = ''
	}: Props = $props()

	let gameWindow: GameWindow
	let editor: Editor
	let settingsIsOpen = $state(false)
	let paintIsOpen = $state(false)
	let mapIsOpen = $state(false)
	let soundIsOpen = $state(false)
	let downloadIsOpen = $state(false)
	let saved = $state(true)
	let inputFile: HTMLInputElement

	const settings = new Settings()

	const t = useTranslations(page.params.lang)

	let iframeCode = $state(code)

	function handleChange() {
		if (settings.autoRefresh) iframeCode = code
		if (settings.autoSave) save()
		else saved = false
	}

	function save() {
		if (!localStorageKey) return
		localStorage.setItem(localStorageKey, code)
		saved = true
	}
	function refresh() {
		iframeCode = code
		gameWindow.refresh()
	}

	function handleKeydown(e: KeyboardEvent) {
		if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'R') {
			refresh()
			e.preventDefault()
		}
		if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'F') {
			editor.formatCode()
			e.preventDefault()
		}
		if ((e.metaKey || e.ctrlKey) && e.key === 's') {
			save()
			e.preventDefault()
		}
		if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'O') {
			inputFile.click()
			e.preventDefault()
		}
		if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'E') {
			downloadIsOpen = true
			e.preventDefault()
		}
	}

	function openPaint() {
		paintIsOpen = true
	}

	function openMap() {
		mapIsOpen = true
	}

	function loadExample(newCode: string) {
		code = newCode
		refresh()
	}

	async function handleFileLoad() {
		const files = inputFile.files
		if (!files) return
		const file = files[0]
		const text = await file?.text()
		if (!text) return
		const matches = parseCode(text)
		if (matches && matches[0]) {
			code = matches[0]
		}
		inputFile.value = ''
	}

	function download(e: SubmitEvent & { currentTarget: HTMLFormElement }) {
		e.preventDefault()
		const data = new FormData(e.currentTarget)

		const downloadLink = document.createElement('a')
		const encodedContent = encodeURIComponent(buildGame(code, false))
		downloadLink.setAttribute('href', 'data:text/html;charset=utf-8,' + encodedContent)
		downloadLink.setAttribute('download', (data.get('filename') ?? 'my-game') + '.html')
		downloadLink.style.display = 'none'
		document.body.appendChild(downloadLink)
		downloadLink.click()
		document.body.removeChild(downloadLink)
	}
</script>

<svelte:window onkeydown={handleKeydown} />
<div class={twMerge('playground  flex h-full flex-col shadow ', className)}>
	<header class="border-border flex items-center justify-between gap-2 border-b px-1 py-2 sm:px-4">
		<div class="flex items-center sm:gap-2">
			<Button
				size="icon"
				tooltip={{
					text: t('playground.refresh'),
					placement: 'bottom-end',
					shortcut: { defaultShortcut: 'ctrl ⇧ R', macShortcut: '⌘ ⇧ R' }
				}}
				variant="ghost"
				onclick={refresh}
			>
				<Icon src={RefreshCw} />
			</Button>

			<Button
				size="icon"
				tooltip={{
					text: t('playground.format'),
					shortcut: { defaultShortcut: 'ctrl ⇧ F', macShortcut: '⌘ ⇧ F' }
				}}
				variant="ghost"
				onclick={() => editor.formatCode()}
			>
				<Icon src={Code} />
			</Button>

			<Button
				size="icon"
				tooltip={{ text: t('playground.paint') }}
				variant="ghost"
				onclick={openPaint}
				class="hidden sm:flex"
			>
				<Icon src={Brush} />
			</Button>

			<Button
				size="icon"
				tooltip={{ text: t('playground.map') }}
				variant="ghost"
				onclick={openMap}
				class="hidden sm:flex"
			>
				<Icon src={Map} />
			</Button>

			<Button
				size="icon"
				tooltip={{ text: t('playground.sounds') }}
				variant="ghost"
				onclick={() => (soundIsOpen = true)}
				class="hidden sm:flex"
			>
				<Icon src={Music} />
			</Button>

			<Button
				size="icon"
				tooltip={{ text: t('playground.settings') }}
				variant="ghost"
				onclick={() => (settingsIsOpen = true)}
				class="hidden sm:flex"
			>
				<Icon src={Wrench} />
			</Button>
		</div>

		{#if examples}
			<div class="flex items-center gap-2">
				<ExampleSelect {examples} onChange={loadExample} />
			</div>
		{/if}

		<div class="flex items-center sm:gap-2">
			<Button
				size="icon"
				tooltip={{
					text: t('playground.save'),
					placement: 'bottom-end',
					shortcut: { defaultShortcut: 'ctrl S', macShortcut: '⌘ S' }
				}}
				variant="ghost"
				class="relative"
				onclick={save}
			>
				<Icon src={Save} />
				{#if !saved}
					<span transition:fade class="absolute top-1 right-1 h-2 w-2 rounded-full bg-amber-400"
					></span>
				{/if}
			</Button>

			<Button
				size="icon"
				tooltip={{
					text: t('playground.open'),
					placement: 'bottom-end',
					shortcut: { defaultShortcut: 'ctrl ⇧ O', macShortcut: '⌘ ⇧ O' }
				}}
				variant="ghost"
				onclick={() => inputFile?.click()}
			>
				<Icon src={FolderOpen} />
			</Button>
			<input type="file" bind:this={inputFile} class="hidden" onchange={handleFileLoad} />

			<Button
				size="icon"
				tooltip={{
					text: t('playground.export'),
					placement: 'bottom-start',
					shortcut: { defaultShortcut: 'ctrl ⇧ E', macShortcut: '⌘ ⇧ E' }
				}}
				variant="ghost"
				onclick={() => (downloadIsOpen = true)}
			>
				<Icon src={Download} />
			</Button>
		</div>
	</header>
	<div class="h-full min-h-0 grow">
		<SplitPane type={orientation} min="10%" max="90%">
			{#snippet a()}
				<Editor bind:code withVim={settings.vimMode} bind:this={editor} {handleChange} />
			{/snippet}
			{#snippet b()}
				<GameWindow class="" code={iframeCode} bind:this={gameWindow} />
			{/snippet}
		</SplitPane>
	</div>
</div>

<Dialog bind:open={paintIsOpen}>
	<Paint />
</Dialog>

<Dialog bind:open={mapIsOpen}>
	<MapEditor />
</Dialog>

<Dialog bind:open={soundIsOpen}>
	<Sound />
</Dialog>

<Dialog bind:open={settingsIsOpen}>
	<form class="grid min-w-xs gap-4 p-8">
		<Switch
			label={t('playgroung.vimMode')}
			class="justify-between"
			bind:checked={settings.vimMode}
		/>
		<Switch
			label={t('playgroung.autoRefresh')}
			class="justify-between"
			bind:checked={settings.autoRefresh}
		/>
		<Switch
			label={t('playgroung.autoSave')}
			class="justify-between"
			bind:checked={settings.autoSave}
		/>
	</form>
</Dialog>

<Dialog bind:open={downloadIsOpen}>
	<form class="grid min-w-xs gap-4 px-8 py-6" onsubmit={download}>
		<label for="filename" class="text-base-content block text-sm font-medium">File name:</label>
		<input
			type="text"
			id="filename"
			name="filename"
			placeholder="my-game"
			class="bg-base-200 block w-full rounded-sm border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
			required
		/>
		<div class="mt-4 flex justify-end gap-2">
			<Button variant="ghost">Download</Button>
			<Button variant="ghost" type="button" onclick={() => (downloadIsOpen = false)}>Cancel</Button>
		</div>
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
