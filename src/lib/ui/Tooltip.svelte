<script lang="ts">
	import { createPopper, type Placement } from '@popperjs/core'
	import type { Props as ShortcutProps } from './Shortcut.svelte'
	import { onMount } from 'svelte'
	import { Shortcut } from '$lib'

	export type Props = {
		text: string
		placement?: Placement
		delay?: number
		shortcut?: ShortcutProps
	}

	let { text, placement = 'bottom', delay = 0, shortcut }: Props = $props()

	let element: HTMLElement
	let timeOutId: ReturnType<typeof setTimeout> | null = null

	onMount(() => {
		const referenceEl = element.previousElementSibling as HTMLElement
		if (!referenceEl) return
		const popperInstance = createPopper(referenceEl, element, {
			placement,
			modifiers: [
				{ name: 'offset', options: { offset: [0, 8] } },
				{ name: 'arrow', options: { padding: 5 } },
			],
		})

		const mouseEnter = () => {
			if (timeOutId) clearTimeout(timeOutId)
			timeOutId = setTimeout(() => {
				timeOutId = null
				element.classList.remove('hidden')
				element.setAttribute('aria-hidden', 'false')
				popperInstance.update()
			}, delay * 1000)
		}

		const mouseLeave = () => {
			if (timeOutId) clearTimeout(timeOutId)
			element.classList.add('hidden')
			element.setAttribute('aria-hidden', 'true')
		}

		referenceEl.addEventListener('mouseenter', mouseEnter)
		referenceEl.addEventListener('mouseleave', mouseLeave)

		return () => {
			popperInstance.destroy()
			referenceEl.removeEventListener('mouseenter', mouseEnter)
			referenceEl.removeEventListener('mouseleave', mouseLeave)
		}
	})
</script>

<div
	bind:this={element}
	class="tooltip z-50 hidden rounded-xs bg-gray-800 px-3 py-1 text-sm text-white dark:bg-gray-200 dark:text-black"
	role="tooltip"
	aria-hidden="true"
>
	{text}
	{#if shortcut}
		<Shortcut class="ms-1 text-gray-200 dark:text-gray-800" {...shortcut} />
	{/if}
	<div data-popper-arrow class="arrow"></div>
</div>

<style>
	.arrow,
	.arrow::before {
		position: absolute;
		width: 8px;
		height: 8px;
		background: inherit;
	}

	.arrow {
		visibility: hidden;
	}

	.arrow::before {
		visibility: visible;
		content: '';
		transform: rotate(45deg);
	}
	:global(.tooltip[data-popper-placement^='top'] > .arrow) {
		bottom: -4px;
	}

	:global(.tooltip[data-popper-placement^='bottom'] > .arrow) {
		top: -4px;
	}

	:global(.tooltip[data-popper-placement^='left'] > .arrow) {
		right: -4px;
	}

	:global(.tooltip[data-popper-placement^='right'] > .arrow) {
		left: -4px;
	}
</style>
