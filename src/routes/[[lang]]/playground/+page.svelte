<script lang="ts">
	import { browser } from '$app/environment'
	import { page } from '$app/state'
	import { Header, MediaQuery, Playground, useTranslations } from '$lib'
	import defaultCode from '../../../content/examples/1-basic/1-hello-world?raw'
	import type { PageProps } from './$types'

	const { data }: PageProps = $props()

	const LOCALSTORAGEKEY = 'odyc-playground-save'

	const localCode = browser ? localStorage.getItem(LOCALSTORAGEKEY) : null

	let locales = [
		{ lang: 'english', url: '/playground' },
		{
			lang: 'français',
			url: '/fr/playground',
		},
	]

	const code = localCode ?? defaultCode

	let t = useTranslations(page.params.lang)
</script>

<svelte:head>
	<title>{t('nav.playground')} • Odyc.js</title>
</svelte:head>
<div class="flex h-screen flex-col">
	{#key page.params.lang}
		<Header {locales} />
		<MediaQuery query="(width>=48rem)">
			{#snippet children(match)}
				{#if match}
					<Playground
						class="h-full min-h-0 grow"
						examples={data.examples}
						{code}
						localStorageKey={LOCALSTORAGEKEY}
					/>
				{:else}
					<Playground
						class="h-full min-h-0 grow"
						orientation="vertical"
						{code}
						localStorageKey={LOCALSTORAGEKEY}
					/>
				{/if}
			{/snippet}
		</MediaQuery>
	{/key}
</div>
