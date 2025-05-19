<script lang="ts">
	import { page } from '$app/state'
	import { Button, Range, useTranslations } from '$lib'
	import { Check } from '@steeze-ui/heroicons'
	import {
		Clipboard,
		Eraser,
		FlipHorizontal,
		FlipVertical,
		RotateCw
	} from '@steeze-ui/lucide-icons'
	import { Icon } from '@steeze-ui/svelte-icon'
	import { onMount, tick } from 'svelte'
	import {
		defaultColors,
		drawGrid,
		getMousePos,
		gridToString,
		initGrid,
		mirrorGrid,
		resizeGrid,
		rotateGrid,
		setGrid,
		stringToGrid
	} from './utils'

	type Props = {
		src?: string
	}

	let { src }: Props = $props()

	let canvas: HTMLCanvasElement
	let currentColor = $state(0)
	let width = $state(8)
	let height = $state(8)
	let copied = $state(false)
	// svelte-ignore state_referenced_locally
	let grid = $state(initGrid(width, height))

	let ctx: CanvasRenderingContext2D

	const t = useTranslations(page.params.lang)

	onMount(() => {
		ctx = canvas.getContext('2d')!
	})

	$effect(() => {
		if (ctx) {
			drawGrid(grid, width, height, ctx)
			copied = false
		}
	})

	$effect(() => {
		if (src) {
			const newSprite = stringToGrid(src)
			width = newSprite.width
			height = newSprite.height
			grid = newSprite.grid
		}
	})

	function handleClick(e: MouseEvent) {
		const [x, y] = getMousePos(e, width, height)
		grid = setGrid(grid, x, y, currentColor)
	}

	function handleMouseMove(e: MouseEvent) {
		const [x, y] = getMousePos(e, width, height)
		const isPressed = e.buttons === 1
		if (isPressed) {
			grid = setGrid(grid, x, y, currentColor)
		}
	}

	function clear() {
		grid = initGrid(width, height)
	}

	function rotate() {
		const newGrid = rotateGrid(grid, width, height)
		;[height, width] = [width, height]
		grid = newGrid
		canvas.width = width
		canvas.height = height
	}

	function mirrorX() {
		const newGrid = mirrorGrid(grid, width, height)
		grid = newGrid
	}

	function mirrorY() {
		const newGrid = mirrorGrid(grid, width, height, true)
		grid = newGrid
	}

	async function handleChangeWidth(e: Event) {
		const target = e.target as HTMLInputElement
		width = target.valueAsNumber
		grid = resizeGrid(grid, width, height)
		await tick()
		if (ctx) drawGrid(grid, target.valueAsNumber, height, ctx)
	}

	async function handleChangeHeight(e: Event) {
		const target = e.target as HTMLInputElement
		height = target.valueAsNumber
		grid = resizeGrid(grid, width, height)
	}

	function copyToClipBoard() {
		const text = gridToString(grid, width, height)
		navigator.clipboard.writeText(text)
		copied = true
	}
</script>

<div class="w-sm px-4">
	<div class="flex gap-2 pt-2">
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
	<div class="my-3 flex aspect-square">
		<canvas
			onclick={(e) => handleClick(e)}
			onmousemove={(e) => handleMouseMove(e)}
			class={[
				'pixelated m-auto max-h-full max-w-full cursor-crosshair',
				width > height ? 'h-auto w-full' : 'h-full w-auto'
			]}
			bind:this={canvas}
			{width}
			{height}
		></canvas>
	</div>
	<div class="flex gap-1.5">
		<label
			class={[
				'aspect-square h-auto w-full cursor-pointer bg-gradient-to-br from-white from-50% to-gray-300 to-50% ring transition-all',
				currentColor === -1 ? 'ring-2 ring-blue-800 dark:ring-blue-600' : 'ring-gray-400'
			]}
		>
			<input type="radio" bind:group={currentColor} value={-1} hidden />
		</label>
		{#each defaultColors as color, index}
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
			value={width}
			label={t('paint.width') + ' ' + width}
			oninput={handleChangeWidth}
		/>
		<Range
			min={2}
			max={24}
			value={height}
			label={t('paint.height') + ' ' + height}
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
