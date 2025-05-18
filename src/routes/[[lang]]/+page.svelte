<script lang="ts">
	import { page } from '$app/state'
	import { getLangFromUrl, makeLocaleUrl } from '$lib'

	const lang = getLangFromUrl(page.url)
</script>

<h1>Hello</h1>
<a href={makeLocaleUrl('playground', lang)}>Playground</a>
