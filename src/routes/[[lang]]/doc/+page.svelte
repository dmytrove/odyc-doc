<script lang="ts">
	import { page } from '$app/state'
	import { getLangFromUrl, slugify } from '$lib'
	import { summary } from '../../../content/doc/summary'
	import type { PageProps } from './$types'

	const lang = getLangFromUrl(page.url)
</script>

<div class="prose">
	<ul>
		{#each summary as category}
			<li>
				<h2>{category[lang]}</h2>
				<ul>
					{#each category.items as post}
						<li>
							<!-- <a href="/doc/{slugify(category[lang])}/{slugify(post[lang])}">{post[lang]}</a> -->
						</li>
					{/each}
				</ul>
			</li>
		{/each}
	</ul>
</div>
