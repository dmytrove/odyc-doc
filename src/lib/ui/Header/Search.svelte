<script lang="ts">
	import { afterNavigate } from '$app/navigation'
	import { Dialog } from '$lib'
	import { onMount } from 'svelte'

	type Props = {
		open: boolean
	}

	let { open = $bindable() }: Props = $props()
	let searchWrapper: HTMLElement | undefined = $state()
	let pagefindUi: any

	onMount(async () => {
		//@ts-ignore
		pagefindUi = new PagefindUI({
			element: searchWrapper,
			showImages: false,
			processResult(result: any) {
				result.url = result.url.replace('.html', '/')
				return result
			}
		})
	})

	afterNavigate(() => {
		pagefindUi.destroy()
		//@ts-ignore
		pagefindUi = new PagefindUI({
			element: searchWrapper,
			showImages: false,
			processResult(result: any) {
				result.url = result.url.replace('.html', '/')
				return result
			}
		})
		open = false
	})

	function handlekeydown(e: KeyboardEvent) {
		if ((e.metaKey || e.ctrlKey) && e.key === 'k') open = true
	}
</script>

<svelte:window onkeydown={handlekeydown} />

<Dialog bind:open class="max-w-2xl p-4">
	<div bind:this={searchWrapper}></div>
</Dialog>

<style>
	div {
		--pagefind-ui-primary: var(--color-base-content);
		--pagefind-ui-text: var(--color-base-content);
		--pagefind-ui-background: var(--color-base-100);
		--pagefind-ui-border: var(--color-border);
	}
</style>
