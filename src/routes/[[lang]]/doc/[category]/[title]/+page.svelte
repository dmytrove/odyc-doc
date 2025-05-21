<script lang="ts">
	import { page } from '$app/state'
	import { onMount } from 'svelte'
	import type { PageProps } from './$types'

	const { data }: PageProps = $props()
	const { category, title, Content } = data

	let wrapper: HTMLElement | undefined = $state()

	onMount(() => {
		const pres = wrapper?.querySelectorAll<HTMLPreElement>('pre.shiki')

		const clipboardSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="size-5">
        <rect width="8" height="4" x="8" y="2" rx="1" ry="1"/>
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
      </svg>`

		const clipboardCheckSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="size-5">
        <rect width="8" height="4" x="8" y="2" rx="1" ry="1"/>
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>
      </svg>
`
		pres?.forEach((pre) => {
			const codeElement = pre.querySelector('code')
			if (!codeElement || !codeElement.textContent) return
			pre.classList.add('relative')
			pre.classList.add('group')
			const button = document.createElement('button')
			button.innerHTML = clipboardSvg
			button.className =
				'text-white flex opacity-0 group-hover:opacity-100 transition p-1.5 absolute right-2 top-3 hover:bg-gray-900 cursor-pointer z-10'
			button.addEventListener('click', () => {
				navigator.clipboard.writeText(codeElement.textContent ?? '')
				button.innerHTML = clipboardCheckSvg
				button.classList.remove('opacity-0')
				setTimeout(() => {
					button.innerHTML = clipboardSvg
					button.classList.add('opacity-0')
				}, 2000)
			})
			pre.append(button)
		})
	})
</script>

<article class="prose mx-auto max-w-prose" bind:this={wrapper}>
	<h1>{title}</h1>
	<Content />
</article>
