<script lang="ts">
	import { page } from '$app/state'
	import { getDocLocales, getLangFromUrl, makeDocPostUrl } from '$lib'
	import type { Snippet } from 'svelte'
	import { summary } from '../../../content/doc/summary'
	import { twMerge } from 'tailwind-merge'
	import Header from '$lib/ui/Header.svelte'

	type Props = {
		children: Snippet
	}

	let { children }: Props = $props()
	let lang = $derived(getLangFromUrl(page.url))
</script>

<Header locales={getDocLocales(page.params.category, page.params.title, page.url)} />
<div class=" flex">
	<nav
		class="bg-base-100 border-border text-base-content sticky top-0 h-screen w-2xs overflow-auto border-r px-8 pt-8"
	>
		<ul class="space-y-12">
			{#each summary as category}
				<li class="">
					<h2 class="font-bold">{category[lang]}</h2>
					<ul class="mt-2 space-y-0.5">
						{#each category.items as post}
							<li>
								<a
									href={makeDocPostUrl(category[lang], post[lang], page.url)}
									class={twMerge(
										'text-base-content/70 hover:text-base-content hover:underline',
										page.url.pathname === makeDocPostUrl(category[lang], post[lang], page.url) &&
											'text-base-content underline'
									)}
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
