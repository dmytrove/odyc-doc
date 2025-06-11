<script lang="ts">
	import { page } from '$app/state'
	import { useTranslations, type DocPostFrontamatter } from '$lib'
	import { onMount } from 'svelte'
	import { twMerge } from 'tailwind-merge'

	type Props = {
		toc: DocPostFrontamatter['toc']
	}

	interface TocEntry {
		title: string
		url: string
		depth: number
		children: TocEntry[]
	}

	const { toc }: Props = $props()

	let t = useTranslations(page.params.lang)

	const nestedToc: TocEntry[] = []
	const parents: TocEntry[] = []

	let current = $state('')

	let isObserving = true

	function handleClick(id: string) {
		current = id
		isObserving = false
		setTimeout(() => (isObserving = true), 1000)
	}

	onMount(() => {
		const headings = document.querySelectorAll(
			'#main-content h1, #main-content h2, #main-content h3, #main-content h4, #main-content h5'
		)

		const observer = new IntersectionObserver(
			(entries) => {
				if (!isObserving) return
				for (const { isIntersecting, target } of entries) {
					if (isIntersecting) {
						current = '#' + target.id
						break
					}
				}
			},
			{
				// Negative bottom margin means heading needs to be towards top of viewport to trigger intersection.
				rootMargin: '0% 0% -80%',
			}
		)

		headings.forEach((el) => {
			observer.observe(el)
		})

		return () => {
			headings.forEach((el) => {
				observer.unobserve(el)
			})
		}
	})

	for (const heading of toc) {
		const item: TocEntry = {
			...heading,
			children: [],
		}
		if (heading.depth === 1) {
			item.depth = 2
			item.title = t('doc.overview')
		}

		while (parents.length > 0 && item.depth <= parents[parents.length - 1].depth) {
			parents.pop()
		}

		if (parents.length === 0) {
			nestedToc.push(item)
		} else {
			const parent = parents[parents.length - 1]
			parent.children.push(item)
		}

		parents.push(item)
	}
</script>

{#snippet chunk(items: TocEntry[])}
	<ul class=" mt-2 grid gap-2 px-3 text-sm">
		{#each items as { title, url, children }}
			<li class="">
				<a
					href={url}
					onclick={() => {
						handleClick(url)
					}}
					class={twMerge(
						'text-base-content/70 hover:text-base-content line-clamp-1 hover:underline',
						current && url.endsWith(current) && 'text-base-content underline'
					)}>{title}</a
				>
				{#if children.length}
					{@render chunk(children)}
				{/if}
			</li>
		{/each}
	</ul>
{/snippet}

<div class="">
	<h2 class="font-semi text-base-content pl-3 text-lg">{t('doc.onThisPage')}</h2>
	{@render chunk(nestedToc)}
</div>
