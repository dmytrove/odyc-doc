<script lang="ts">
	import { page } from '$app/state'
	import { Button, odycColors, Range, useTranslations } from '$lib'
	import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Check } from '@steeze-ui/heroicons'
	import {
		Clipboard,
		Eraser,
		FlipHorizontal,
		FlipVertical,
		RotateCw
	} from '@steeze-ui/lucide-icons'
	import { Icon } from '@steeze-ui/svelte-icon'
	import { onMount, tick } from 'svelte'
	import { Drawing } from './Drawing.svelte'

	type Props = {}

	let {}: Props = $props()

	let canvas: HTMLCanvasElement
	let currentColor = $state(0)
	let copied = $state(false)

	const drawing = new Drawing()

	let ctx: CanvasRenderingContext2D

	const t = useTranslations(page.params.lang)

	onMount(() => {
		ctx = canvas.getContext('2d')!
		canvas.width = drawing.width
		canvas.height = drawing.height
		drawing.display(ctx)
	})

	function handleClick(e: MouseEvent) {
		const [x, y] = getMousePos(e)
		drawing.putPixel(x, y, currentColor)
		drawing.display(ctx)
	}

	function handleMouseMove(e: MouseEvent) {
		const [x, y] = getMousePos(e)
		const isPressed = e.buttons === 1
		if (isPressed) {
			drawing.putPixel(x, y, currentColor)
			drawing.display(ctx)
		}
	}

	async function handleChangeWidth(e: Event) {
		const target = e.target as HTMLInputElement
		const width = target.valueAsNumber
		drawing.resize(width, drawing.height)
		await tick()
		drawing.display(ctx)
	}

	async function handleChangeHeight(e: Event) {
		const target = e.target as HTMLInputElement
		const height = target.valueAsNumber
		drawing.resize(drawing.width, height)
		await tick()
		drawing.display(ctx)
	}

	function mirrorX() {
		drawing.mirror()
		drawing.display(ctx)
	}

	function mirrorY() {
		drawing.mirror(true)
		drawing.display(ctx)
	}

	async function rotate() {
		drawing.rotate()
		await tick()
		drawing.display(ctx)
	}

	function moveUp() {
		drawing.move(0, -1)
		drawing.display(ctx)
	}

	function moveRight() {
		drawing.move(1, 0)
		drawing.display(ctx)
	}

	function moveDown() {
		drawing.move(0, 1)
		drawing.display(ctx)
	}

	function moveLeft() {
		drawing.move(-1, 0)
		drawing.display(ctx)
	}

	function clear() {
		drawing.clear()
		drawing.display(ctx)
	}

	function copyToClipBoard() {
		navigator.clipboard.writeText(drawing.text)
		copied = true
		setTimeout(() => (copied = false), 1000)
	}

	async function handlePaste(e: ClipboardEvent) {
		if (e.clipboardData?.files?.[0]) {
			await drawing.loadImgFile(e.clipboardData.files[0])
			drawing.display(ctx)
		} else if (e.clipboardData?.getData('Text')) {
			drawing.text = e.clipboardData.getData('Text')
			drawing.display(ctx)
		}
	}

	function getMousePos(e: MouseEvent) {
		const target = e.target as HTMLElement
		const { left, top, width, height } = target.getBoundingClientRect()
		const x = Math.floor(((e.clientX - left) / width) * drawing.width)
		const y = Math.floor(((e.clientY - top) / height) * drawing.height)
		return [x, y]
	}
</script>

<div class="w-sm px-4" onpaste={handlePaste}>
	<div class="flex pt-2">
		<Button
			size="icon"
			variant="ghost"
			tooltip={{ text: t('paint.horizontalMirror') }}
			onclick={mirrorX}
		>
			<Icon src={FlipHorizontal} />
		</Button>
		<Button
			size="icon"
			variant="ghost"
			tooltip={{ text: t('paint.verticalMirror') }}
			onclick={mirrorY}
		>
			<Icon src={FlipVertical} />
		</Button>
		<Button size="icon" variant="ghost" tooltip={{ text: t('paint.rotate') }} onclick={rotate}>
			<Icon src={RotateCw} />
		</Button>
		<Button size="icon" variant="ghost" tooltip={{ text: t('paint.up') }} onclick={moveUp}>
			<Icon src={ArrowUp} />
		</Button>
		<Button size="icon" variant="ghost" tooltip={{ text: t('paint.right') }} onclick={moveRight}>
			<Icon src={ArrowRight} />
		</Button>
		<Button size="icon" variant="ghost" tooltip={{ text: t('paint.down') }} onclick={moveDown}>
			<Icon src={ArrowDown} />
		</Button>
		<Button size="icon" variant="ghost" tooltip={{ text: t('paint.left') }} onclick={moveLeft}>
			<Icon src={ArrowLeft} />
		</Button>
		<Button
			size="icon"
			variant="ghost"
			tooltip={{ text: t('paint.clear') }}
			onclick={clear}
			class="ms-auto"
		>
			<Icon src={Eraser} />
		</Button>
	</div>
	<div class="mt-3 flex aspect-square">
		<canvas
			onclick={(e) => handleClick(e)}
			onmousemove={(e) => handleMouseMove(e)}
			class={[
				'pixelated m-auto max-h-full max-w-full cursor-crosshair',
				drawing.width > drawing.height ? 'h-auto w-full' : 'h-full w-auto'
			]}
			bind:this={canvas}
			width={drawing.width}
			height={drawing.height}
		></canvas>
	</div>
	<div class="mt-3 flex gap-1.5">
		<label
			class={[
				'aspect-square h-auto w-full cursor-pointer bg-gradient-to-br from-white from-50% to-gray-300 to-50% ring transition-all',
				currentColor === -1 ? 'ring-2 ring-blue-800 dark:ring-blue-600' : 'ring-gray-400'
			]}
		>
			<input type="radio" bind:group={currentColor} value={-1} hidden />
		</label>
		{#each odycColors as color, index}
			<label
				class={[
					'aspect-square h-auto w-full cursor-pointer ring transition-all',
					index === currentColor ? 'ring-2 ring-blue-800 dark:ring-blue-600' : 'ring-gray-400'
				]}
				style="background-color: {color};"
			>
				<input type="radio" bind:group={currentColor} value={index} hidden />
			</label>
		{/each}
	</div>
	<div class="mt-6">
		<Range
			min={2}
			max={24}
			value={drawing.width}
			label={t('paint.width') + ' ' + drawing.width}
			oninput={handleChangeWidth}
		/>
		<Range
			min={2}
			max={24}
			value={drawing.height}
			label={t('paint.height') + ' ' + drawing.height}
			class="mt-2"
			oninput={handleChangeHeight}
		/>
	</div>
	<div class="mt-2 flex justify-end gap-4 px-2 pt-2 pb-4">
		<Button onclick={() => copyToClipBoard()} class="">
			{t('paint.copy')}
			<Icon src={copied ? Check : Clipboard} class="size-5" />
		</Button>
	</div>
</div>
