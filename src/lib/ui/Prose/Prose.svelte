<script lang="ts">
	import { onMount, type Snippet } from 'svelte'
	import { twMerge } from 'tailwind-merge'
	import { checkIcon, copyIcon } from './icons'
	import { useTranslations } from '$lib/i18n'
	import { page } from '$app/state'

	type Props = {
		children: Snippet
		pagefindBody?: boolean
		class?: string
	}

	let { children, class: className, pagefindBody = false }: Props = $props()
	let wrapper: HTMLElement

	const t = useTranslations(page.params.lang)

	onMount(() => {
		const pre = wrapper.querySelectorAll<HTMLPreElement>('pre.shiki')
		pre.forEach((el) => {
			el.classList.add('relative')
			el.classList.add('group')
			const content = el.textContent
			if (!content) return
			const btn = document.createElement('button')
			btn.setAttribute('title', t('copy'))
			btn.classList.value =
				'opacity-0 group-hover:opacity-100 transition flex rounded-sm absolute top-2 right-2 border border-border p-1.5 cursor-pointer text-base-content/70 hover:text-base-content'
			btn.innerHTML = copyIcon
			el.append(btn)
			btn.addEventListener('click', () => {
				btn.innerHTML = checkIcon
				navigator.clipboard.writeText(content)

				setTimeout(() => {
					btn.innerHTML = copyIcon
				}, 1000)
			})
		})
	})
</script>

<div class={twMerge('prose px-8', className)} data-pagefind-body={pagefindBody} bind:this={wrapper}>
	{@render children()}
</div>
