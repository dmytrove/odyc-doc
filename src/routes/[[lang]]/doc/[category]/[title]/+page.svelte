<script lang="ts">
	import { onMount } from 'svelte'
	import type { PageProps } from './$types'

	const { data }: PageProps = $props()
	const { category, title, Content } = data

	let wrapper: HTMLElement | undefined = $state()
</script>

<article
	class="prose dark:prose-invert prose-pre:rounded-none prose-pre:border-border prose-pre:border mx-auto max-w-prose"
	bind:this={wrapper}
>
	<h1>{title}</h1>
	<Content />
</article>
