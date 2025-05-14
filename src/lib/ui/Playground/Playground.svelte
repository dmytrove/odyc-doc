<script lang="ts">
	import { Dialog, Editor, GameWindow, IconBtn, Switch } from '$lib';
	import { SplitPane } from '@rich_harris/svelte-split-pane';
	import { ArrowPath, ArrowsPointingOut, CodeBracket, Wrench } from 'svelte-hero-icons';
	import { twMerge } from 'tailwind-merge';
	import { formatJs } from './formater';

	type Props = {
		class?: string;
	};

	let { class: className = '' }: Props = $props();

	let gameWindow: GameWindow;
	let settingsIsOpen = $state(false);
	let withVim = $state(false);
	let autoRefresh = $state(true);
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
`);

	// svelte-ignore state_referenced_locally
	let iframeCode = $state(code);

	$effect(() => {
		if (autoRefresh) iframeCode = code;
	});

	function formatCode() {
		code = formatJs(code);
	}
</script>

<div class={twMerge('playground  flex h-full flex-col shadow dark:bg-gray-900', className)}>
	<header
		class="flex items-center justify-between gap-2 border-b border-gray-200 px-4 py-3 dark:border-gray-700"
	>
		<div class="flex items-center gap-2">
			{#if !autoRefresh}
				<IconBtn
					icon={ArrowPath}
					onclick={() => (iframeCode = code)}
					label="Reload"
					tooltipPlacement="bottom"
				/>
			{/if}

			<IconBtn
				icon={CodeBracket}
				onclick={formatCode}
				label="Format code"
				tooltipPlacement="bottom"
			/>
			<IconBtn
				icon={Wrench}
				onclick={() => (settingsIsOpen = true)}
				label="Settings"
				tooltipPlacement="bottom"
			/>
		</div>

		<div class="flex items-center gap-2">
			<IconBtn
				icon={ArrowsPointingOut}
				onclick={gameWindow.requestFullscreen}
				label="Fullscreen"
				tooltipPlacement="bottom"
			/>
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
