<script lang="ts">
	import { Button, Range } from '$lib'
	import { onMount, tick } from 'svelte'
	import {
		ArrowsRightLeft,
		ArrowsUpDown,
		ArrowUturnDown,
		ArrowUturnRight,
		Check,
		Clipboard,
		Icon,
		Trash
	} from 'svelte-hero-icons'
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
	<div class="flex gap-2 px-2 pt-4">
		<Button size="icon" tooltip={{ text: 'Mirror X' }} onclick={mirrorX}>
			<Icon src={ArrowsRightLeft} />
		</Button>
		<Button size="icon" tooltip={{ text: 'Mirror Y' }} onclick={mirrorY}>
			<Icon src={ArrowsUpDown} />
		</Button>
		<Button size="icon" tooltip={{ text: 'Rotate' }} onclick={rotate}>
			<Icon src={ArrowUturnDown} class="-scale-x-100" />
		</Button>
		<Button size="icon" tooltip={{ text: 'Clear' }} onclick={clear} class="ms-auto">
			<Icon src={Trash} />
		</Button>
	</div>
	<div class="my-4 flex aspect-square">
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
	<div class="flex gap-1.5 px-2">
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
	<div class="mt-6 px-2">
		<Range min={2} max={24} value={width} label="Width {width}" oninput={handleChangeWidth} />
		<Range
			min={2}
			max={24}
			value={height}
			label="Height {height}"
			class="mt-2"
			oninput={handleChangeHeight}
		/>
	</div>
	<div class="mt-2 flex px-2 pt-2 pb-4">
		<Button onclick={() => copyToClipBoard()} class="ms-auto">
			Copy
			<Icon src={copied ? Check : Clipboard} class="size-5" />
		</Button>
	</div>
</div>
