<script lang="ts">
	import type { Snippet } from 'svelte';
	import { click_outside } from '$lib';
	import { twMerge } from 'tailwind-merge';

	type Props = {
		open: boolean;
		children: Snippet;
		class?: string;
	};

	let { open = $bindable(), children, class: className }: Props = $props();
	let dialogElement: HTMLDialogElement;

	$effect(() => {
		if (dialogElement.open !== open) {
			if (open) dialogElement.showModal();
			else dialogElement.close();
		}
	});
</script>

<dialog
	bind:this={dialogElement}
	class="fixed top-1/2 left-1/2 -translate-1/2 backdrop:bg-white/40 backdrop:backdrop-blur-sm dark:backdrop:bg-black/40"
	onclose={() => (open = false)}
>
	<div
		use:click_outside={() => (open = false)}
		class={twMerge(
			'bg:gray-50 border border-gray-100 dark:border-gray-800 dark:bg-gray-950 dark:text-white',
			className
		)}
	>
		{@render children()}
	</div>
</dialog>
