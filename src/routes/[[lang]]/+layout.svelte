<script lang="ts">
	import '@fontsource-variable/pixelify-sans'
	import 'codemirror-theme-vars/base.css'
	import { type Snippet } from 'svelte'
	import '../../app.css'
	import { defaultLang, languages, useTranslations } from '$lib'
	import { page } from '$app/state'
	let { children }: { children: Snippet } = $props()
	let lang = page.params.lang ?? defaultLang
	let path = $derived(page.url.pathname.replace(new RegExp(`^\/${lang}`), ''))
	const t = useTranslations(lang)
</script>

<svelte:head>
	<meta name="description" content={t('meta.description')} />
	{#each Object.entries(languages) as [code]}
		{#if code !== lang}
			<link
				rel="alternate"
				hreflang={code}
				href="https://odyc.dev{code !== defaultLang ? '/' + code : ''}{path}"
			/>
		{/if}
	{/each}
</svelte:head>

<div class="bg-base-100">
	{@render children()}
</div>
