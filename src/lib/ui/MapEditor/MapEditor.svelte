<script lang="ts">
	import { Button, Tooltip, useTranslations } from '$lib'
	import { Check, Clipboard, Minus, Plus } from '@steeze-ui/lucide-icons'
	import { Icon } from '@steeze-ui/svelte-icon'
	import { onMount, tick } from 'svelte'
	import { Drawing, FONT_SIZE } from './Drawing.svelte'
	import { page } from '$app/state'

	const drawing = new Drawing(`
	xxxxxxxx
	x......x
	x......x
	x......x
	x......x
	x......x
	x......x
	xxxxxxxx
	`)
	let char = $state('x')
	let copied = $state(false)
	let canvas: HTMLCanvasElement
	let ctx: CanvasRenderingContext2D

	const t = useTranslations(page.params.lang)

	onMount(() => {
		ctx = canvas.getContext('2d')!
		canvas.width = drawing.width * FONT_SIZE
		canvas.height = drawing.height * FONT_SIZE
		drawing.display(ctx)
	})

	function handleClick(e: PointerEvent) {
		e.preventDefault()
		const [x, y] = getMousePos(e)
		drawing.putPixel(x, y, char)
		drawing.display(ctx)
		// onChange?.(drawing.text)
	}

	function addTop() {
		drawing.resize(0, 1, 0, -1)
		canvas.width = drawing.width * FONT_SIZE
		canvas.height = drawing.height * FONT_SIZE
		drawing.display(ctx)
	}
	function removeTop() {
		drawing.resize(0, -1, 0, 1)
		canvas.width = drawing.width * FONT_SIZE
		canvas.height = drawing.height * FONT_SIZE
		drawing.display(ctx)
	}

	function addRight() {
		drawing.resize(1, 0, 0, 0)
		canvas.width = drawing.width * FONT_SIZE
		canvas.height = drawing.height * FONT_SIZE
		drawing.display(ctx)
	}
	function removeRight() {
		drawing.resize(-1, 0, 0, 0)
		canvas.width = drawing.width * FONT_SIZE
		canvas.height = drawing.height * FONT_SIZE
		drawing.display(ctx)
	}

	function addBottom() {
		drawing.resize(0, 1, 0, 0)
		canvas.width = drawing.width * FONT_SIZE
		canvas.height = drawing.height * FONT_SIZE
		drawing.display(ctx)
	}
	function removeBottom() {
		drawing.resize(0, -1, 0, 0)
		canvas.width = drawing.width * FONT_SIZE
		canvas.height = drawing.height * FONT_SIZE
		drawing.display(ctx)
	}

	function addLeft() {
		drawing.resize(1, 0, -1, 0)
		canvas.width = drawing.width * FONT_SIZE
		canvas.height = drawing.height * FONT_SIZE
		drawing.display(ctx)
	}
	function removeLeft() {
		drawing.resize(-1, 0, 1, 0)
		canvas.width = drawing.width * FONT_SIZE
		canvas.height = drawing.height * FONT_SIZE
		drawing.display(ctx)
	}

	function handleMouseMove(e: PointerEvent) {
		e.preventDefault()
		const [x, y] = getMousePos(e)
		const isPressed = e.buttons === 1
		if (isPressed) {
			drawing.putPixel(x, y, char)
			drawing.display(ctx)
			// onChange?.(drawing.text)
		}
	}

	function getMousePos(e: MouseEvent) {
		const target = e.target as HTMLElement
		const { left, top, width, height } = target.getBoundingClientRect()
		const x = Math.floor(((e.clientX - left) / width) * drawing.width)
		const y = Math.floor(((e.clientY - top) / height) * drawing.height)
		return [x, y]
	}

	function copyToClipBoard() {
		navigator.clipboard.writeText(drawing.text)
		copied = true
		setTimeout(() => (copied = false), 1000)
	}

	function handleFocusInput(e: FocusEvent & { currentTarget: HTMLInputElement }) {
		e.currentTarget.select()
	}
</script>

<div class="grid justify-center">
	<input
		type="text"
		bind:value={char}
		maxlength="1"
		class="border-border text-base-content/80 bg-base-200 focus:bg-base-100 focus:text-base-content mx-auto my-2 flex h-12 w-12 cursor-pointer items-center justify-center border p-2 text-center font-mono text-2xl"
		onfocus={handleFocusInput}
	/>
	<Tooltip text={t('map.char')} />
	<div class="mt-8 grid grid-cols-[auto_1fr_auto] grid-rows-[auto_1fr_auto]">
		<div class="col-2 flex items-center justify-center p-1">
			<Button size="icon" variant="ghost" onclick={addTop}><Icon src={Plus} /></Button>
			<Button size="icon" variant="ghost" onclick={removeTop}><Icon src={Minus} /></Button>
		</div>
		<div class="col-2 row-3 flex items-center justify-center p-1">
			<Button size="icon" variant="ghost" onclick={addBottom}><Icon src={Plus} /></Button>
			<Button size="icon" variant="ghost" onclick={removeBottom}><Icon src={Minus} /></Button>
		</div>
		<div class="col-1 row-2 flex flex-col items-center justify-center p-1">
			<Button size="icon" variant="ghost" onclick={addLeft}><Icon src={Plus} /></Button>
			<Button size="icon" variant="ghost" onclick={removeLeft}><Icon src={Minus} /></Button>
		</div>
		<div class="col-3 row-2 flex flex-col items-center justify-center p-1">
			<Button size="icon" variant="ghost" onclick={addRight}><Icon src={Plus} /></Button>
			<Button size="icon" variant="ghost" onclick={removeRight}><Icon src={Minus} /></Button>
		</div>

		<div class="align-center bg-base-300 col-2 row-2 flex aspect-square h-auto w-md justify-center">
			<canvas
				bind:this={canvas}
				onpointerdown={(e) => handleClick(e)}
				onpointermove={(e) => handleMouseMove(e)}
				class={[
					'm-auto max-h-full max-w-full cursor-crosshair touch-none dark:invert-100 ',
					drawing.width > drawing.height ? 'h-auto w-full' : 'h-full w-auto'
				]}
			></canvas>
		</div>
	</div>

	<div class="mt-2 flex justify-end gap-4 px-2 pt-2 pb-4">
		<Button onclick={() => copyToClipBoard()} class="">
			{t('copy')}
			<Icon src={copied ? Check : Clipboard} class="size-5" />
		</Button>
	</div>
</div>
