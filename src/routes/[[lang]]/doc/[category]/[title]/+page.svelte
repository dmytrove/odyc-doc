<script lang="ts">
	import { fade } from 'svelte/transition'
	import type { PageProps } from './$types'
	import Pagination from './Footer.svelte'
	import Toc from './Toc.svelte'

	let { data }: PageProps = $props()

	let wrapper: HTMLElement | undefined = $state()
</script>

<div class="flex justify-center">
	<article transition:fade id="main-content" class="px-8 pt-12 pb-12" bind:this={wrapper}>
		{#key data.Content}
			<div class="prose dark:prose-invert mx-auto max-w-prose">
				<data.Content />
			</div>
		{/key}
		<Pagination filePath={data.path} />
	</article>
	<aside class="sticky top-0 hidden h-screen w-2xs pt-16 xl:block">
		{#key data.metadata.toc}
			<Toc toc={data.metadata.toc} />
		{/key}
	</aside>
</div>
