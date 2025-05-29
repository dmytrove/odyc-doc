<script lang="ts">
	import { fade } from 'svelte/transition'
	import type { PageProps } from './$types'
	import Toc from './Toc.svelte'
	import { getpreviousPost, getNextPost, useTranslations } from '$lib'
	import { page } from '$app/state'

	let { data }: PageProps = $props()
	const previousPost = $derived(getpreviousPost(data.category, data.title, page.url))
	const nextPost = $derived(getNextPost(data.category, data.title, page.url))

	const t = useTranslations(page.params.lang)

	let wrapper: HTMLElement | undefined = $state()
</script>

<div class="flex">
	<article transition:fade id="main-content" class="px-8 pt-12 pb-12" bind:this={wrapper}>
		{#key data.Content}
			<div class="prose dark:prose-invert mx-auto max-w-prose">
				<data.Content />
			</div>
		{/key}
		<nav class="border-border mt-28 flex border-t">
			{#if previousPost}
				<div class="border-border flex items-center px-4 py-2">
					<span>&leftarrow;</span>
					<div class=" grid px-6 py-4">
						<span class="text-sm">{t('doc.previous')}</span>
						<a href={previousPost.url} class="font-semi text-lg">{previousPost.title}</a>
					</div>
				</div>
			{/if}
			{#if nextPost}
				<div class="border-border ml-auto flex items-center justify-end px-4 py-2">
					<div class=" grid px-6 py-4">
						<span class="text-right text-sm">{t('doc.next')}</span>
						<a href={nextPost.url} class="font-semi text-lg">{nextPost.title}</a>
					</div>
					<span>&rightarrow;</span>
				</div>
			{/if}
		</nav>
	</article>
	<aside class="sticky top-0 hidden h-screen w-2xs pt-16 xl:block">
		{#key data.metadata.toc}
			<Toc toc={data.metadata.toc} />
		{/key}
	</aside>
</div>
