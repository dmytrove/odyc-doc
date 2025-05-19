<script lang="ts">
	import { onMount } from 'svelte'
	import { twMerge } from 'tailwind-merge'
	import { Workspace } from './Workspace.svelte'
	import { formatJs } from './formatCode'

	type Props = {
		code?: string
		handleChange?: (code: string) => void
		withVim?: boolean
		class?: string
	}
	let {
		code = $bindable(''),
		handleChange,
		withVim = $bindable(false),
		class: className = ''
	}: Props = $props()

	let container: HTMLElement

	let workspace: Workspace

	onMount(() => {
		workspace = new Workspace({
			container,
			defaultCode: code,
			onChange: onCodeChange
		})
	})

	function onCodeChange(value: string) {
		code = value
		handleChange?.(value)
	}

	export function formatCode() {
		workspace.updateCode(formatJs(code))
	}

	$effect(() => {
		workspace.toggleVim(withVim)
	})

	$effect(() => {
		workspace.updateCode(code)
	})
</script>

<div
	bind:this={container}
	class={twMerge('bg-base-200 h-full w-full overflow-auto shadow dark:bg-gray-900', className)}
></div>

<style>
	:global(.cm-editor) {
		height: 100%;

		/* light mode */

		--editor-caret-color: var(--color-gray-700);
		--editor-cursor-border-color: var(--color-gray-700);
		--editor-default-text-color: var(--color-gray-900);
		--editor-background-editor: var(--color-gray-50);
		--editor-selection-background-color: color-mix(in srgb, var(--color-blue-300) 60%, transparent);
		--editor-active-line-background: color-mix(in srgb, var(--color-blue-100) 40%, transparent);
		--editor-gutter-text-color: var(--color-gray-900);
		--editor-gutter-border-color: var(--color-gray-300);
		--editor-active-gutter-line-background: color-mix(
			in srgb,
			var(--color-blue-100) 40%,
			transparent
		);

		--editor-color-keyword: var(--color-violet-700);
		--editor-color-name: var(--color-green-700);
		--editor-color-function: var(--color-blue-900);
		--editor-color-constant: var(--color-orange-900);
		--editor-color-definition: var(--color-blue-600);
		--editor-color-type-name: var(--color-indigo-900);
		--editor-color-operator: var(--color-orange-600);
		--editor-color-comment: var(--color-gray-600);
		--editor-color-link: var(--color-gray-600);
		--editor-color-heading: var(--color-blue-600);
		--editor-color-atom: var(--color-violet-700);
		--editor-color-string: var(--color-orange-600);
		--editor-color-invalid: var(--color-red-900);
	}

	:global(.dark .cm-editor) {
		--editor-caret-color: var(--color-gray-300);
		--editor-cursor-border-color: var(--color-gray-300);
		--editor-default-text-color: var(--color-gray-100);
		--editor-background-editor: var(--color-gray-900);
		--editor-selection-background-color: color-mix(in srgb, var(--color-blue-800) 60%, transparent);
		--editor-active-line-background: color-mix(in srgb, var(--color-blue-900) 20%, transparent);
		--editor-gutter-text-color: var(--color-gray-100);
		--editor-gutter-border-color: var(--color-gray-600);
		--editor-active-gutter-line-background: color-mix(
			in srgb,
			var(--color-blue-900) 40%,
			transparent
		);

		--editor-color-keyword: var(--color-violet-400);
		--editor-color-name: var(--color-green-300);
		--editor-color-function: var(--color-blue-400);
		--editor-color-constant: var(--color-orange-100);
		--editor-color-definition: var(--color-cyan-300);
		--editor-color-type-name: var(--color-indigo-100);
		--editor-color-operator: var(--color-orange-400);
		--editor-color-comment: var(--color-gray-400);
		--editor-color-link: var(--color-gray-400);
		--editor-color-heading: var(--color-blue-400);
		--editor-color-atom: var(--color-violet-300);
		--editor-color-string: var(--color-orange-400);
		--editor-color-invalid: var(--color-red-100);
	}
</style>
