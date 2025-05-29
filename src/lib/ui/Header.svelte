<script lang="ts">
	import { page } from '$app/state'
	import {
		defaultLang,
		getFirstDocPost,
		getLangFromUrl,
		languages,
		SelectLanguage,
		useTranslations
	} from '$lib'
	import { Github, Moon, Sun } from '@steeze-ui/lucide-icons'
	import { Icon } from '@steeze-ui/svelte-icon'

	type Props = {
		locales: { url: string; lang: string }[]
	}

	let { locales: items }: Props = $props()
	let lang = $derived(getLangFromUrl(page.url))
	let t = $derived(useTranslations(lang))

	let urlPrefix = $derived(page.params.lang ? '/' + page.params.lang : '')

	function toggleTheme() {
		document.firstElementChild?.classList.toggle('dark')
		const isDark = document.firstElementChild?.classList.contains('dark')
		localStorage.setItem('theme', isDark ? 'dark' : 'light')
	}
</script>

<header class="border-border iems-center text-base-content flex border-b px-8">
	<a href="/" class="my-auto flex items-center gap-2">
		<img src="/logo.jpeg" alt="" class="pixelated h-8" />
		<span class="font-pixel text-xl"> Odyc.js </span>
	</a>
	<nav class="ml-auto flex items-center gap-4">
		<a
			href={getFirstDocPost(page.url)}
			class="text-base-content/80 hover:text-base-content cursor-pointer p-2">{t('nav.doc')}</a
		>
		<a href="#" class="text-base-content/80 hover:text-base-content cursor-pointer p-2"
			>{t('nav.tutorial')}</a
		>
		<a
			href="{urlPrefix}/playground"
			class="text-base-content/80 hover:text-base-content cursor-pointer p-2"
			>{t('nav.playground')}</a
		>
		<hr class="border-border h-10 w-1 border-0 border-r" />
		<SelectLanguage {items} />
		<button
			class="text-base-content/80 hover:text-base-content cursor-pointer p-1"
			onclick={toggleTheme}
			aria-label={t('header.theme')}
		>
			<Icon src={Sun} class="hidden size-4 dark:block" />
			<Icon src={Moon} class="size-4 dark:hidden" />
		</button>
		<a
			href="https://github.com/achtaitaipai/odyc"
			title="Github"
			class="text-base-content/80 hover:text-base-content cursor-pointer p-1"
			><Icon src={Github} class="size-4" /></a
		>
	</nav>
</header>

<style>
	:global(body) {
		--header-height: 4rem;
	}
	header {
		height: var(--header-height);
	}
</style>
