<script lang="ts">
	import { buildGame } from '$lib/gameCode';
	import { twMerge } from 'tailwind-merge';
	type Props = {
		code?: string;
		class?: string;
	};
	let { code = $bindable(''), class: className = '' }: Props = $props();
	let iframe: HTMLIFrameElement;

	export function requestFullscreen() {
		iframe.requestFullscreen();
		iframe.focus();
	}

	$effect(() => {
		const source = buildGame(code);
		iframe.srcdoc = source;
	});
</script>

<iframe
	src=""
	frameborder="0"
	class={twMerge('h-full w-full', className)}
	title="game"
	bind:this={iframe}
></iframe>
