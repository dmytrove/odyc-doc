<script lang="ts">
	import { createPopper, type Placement } from '@popperjs/core';
	import { onMount } from 'svelte';

	type Props = {
		text: string;
		placement?: Placement;
	};

	let { text, placement = 'bottom' }: Props = $props();

	let element: HTMLElement;

	onMount(() => {
		const referenceEl = element.previousElementSibling as HTMLElement;
		if (!referenceEl) return;
		const popperInstance = createPopper(referenceEl, element, {
			placement,
			modifiers: [
				{ name: 'offset', options: { offset: [0, 8] } },
				{ name: 'arrow', options: { padding: 5 } }
			]
		});

		const show = () => {
			element.classList.remove('hidden');
			element.setAttribute('aria-hidden', 'false');
			popperInstance.update();
		};
		const hide = () => {
			element.classList.add('hidden');
			element.setAttribute('aria-hidden', 'true');
		};

		referenceEl.addEventListener('mouseenter', show);
		referenceEl.addEventListener('mouseleave', hide);

		return () => {
			popperInstance.destroy();
			referenceEl.removeEventListener('mouseenter', show);
			referenceEl.removeEventListener('mouseleave', hide);
		};
	});
</script>

<div
	bind:this={element}
	class="tooltip z-50 hidden rounded-xs bg-gray-800 px-3 py-1 text-sm text-white dark:bg-gray-200 dark:text-black"
	role="tooltip"
	aria-hidden="true"
>
	{text}
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
