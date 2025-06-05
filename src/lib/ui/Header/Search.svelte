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

	function initPagefindUi() {
		//@ts-ignore
		pagefindUi = new PagefindUI({
			element: searchWrapper,
			showImages: false,
			showSubResults: true,
			processResult(result: any) {
				result.url = result.url.replace('.html', '/')
				//@ts-ignore
				result.sub_results = result.sub_results.map((el) => ({
					...el,
					url: el.url.replace('.html', '/')
				}))
				return result
			}
		})
	}

	onMount(async () => {
		initPagefindUi()
	})

	afterNavigate(() => {
		pagefindUi.destroy()
		initPagefindUi()
		open = false
	})

	function handlekeydown(e: KeyboardEvent) {
		if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
			e.preventDefault()
			open = true
		}
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
