<script lang="ts">
	import { page } from '$app/state'
	import { getLangFromUrl, makeDocPostUrl } from '$lib'
	import type { Snippet } from 'svelte'
	import { summary } from '../../../content/doc/summary'

	type Props = {
		children: Snippet
	}

	let { children }: Props = $props()
	const lang = getLangFromUrl(page.url)
</script>

<div class=" flex">
	<nav class="bg-base-200 sticky top-0 h-screen w-2xs overflow-auto px-8 pt-16">
		<ul class="grid gap-3">
			{#each summary as category}
				<li>
					<h2 class="text-lg font-bold">{category[lang]}</h2>
					<ul class="mt-1 grid gap-1">
						{#each category.items as post}
							<li>
								<a
									href={makeDocPostUrl(category, post, page.url)}
									class=""
									class:underline={page.url.pathname === makeDocPostUrl(category, post, page.url)}
									>{post[lang]}
								</a>
							</li>
						{/each}
					</ul>
				</li>
			{/each}
		</ul>
	</nav>
	<main class="grow">
		{@render children()}
	</main>
</div>
