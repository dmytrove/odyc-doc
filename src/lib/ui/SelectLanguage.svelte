<script lang="ts">
	import { afterNavigate } from '$app/navigation'
	import { page } from '$app/state'
	import { defaultLang, getLangFromUrl, languages, useTranslations } from '$lib'
	import { click_outside } from '$lib/actions/clickOutside'
	import { Languages } from '@steeze-ui/lucide-icons'
	import { Icon } from '@steeze-ui/svelte-icon'
	import { fade } from 'svelte/transition'
	import { twMerge } from 'tailwind-merge'

	type Props = {
		placement?: 'top' | 'bottom'
	}
	let { placement = 'bottom' }: Props = $props()
	let isOpen = $state(false)
	let lang = getLangFromUrl(page.url)
	let baseUrl = $derived(
		lang !== defaultLang ? page.url.pathname.replace('/' + lang, '') : page.url.pathname
	)

	const t = useTranslations(lang)

	const placementClasses = {
		top: 'bottom-full right-0',
		bottom: 'top-full right-0'
	}

	afterNavigate(() => {
		isOpen = false
	})
</script>

{#snippet item(langCode: string, langLabel: string)}
	{@const url = (langCode === defaultLang ? '' : '/' + langCode) + baseUrl}
	<li>
		<a
			href={url}
			class={twMerge(
				'text-base-content/70 hover:text-base-content capitalize',
				page.url.pathname === url && 'text-base-content'
			)}>{langLabel}</a
		>
	</li>
{/snippet}

<div class="relative" use:click_outside={() => (isOpen = false)}>
	<button
		class="text-base-content/80 hover:text-base-content cursor-pointer p-1"
		aria-haspopup="true"
		onclick={() => (isOpen = !isOpen)}
		aria-label={t('header.selectLang')}
		aria-expanded={isOpen}><Icon src={Languages} class="size-4" /></button
	>
	{#if isOpen}
		<ul
			transition:fade={{ delay: 0, duration: 200 }}
			class={twMerge(
				'bg-base-100 border-border absolute  z-50 space-y-2 rounded-sm px-3 py-2 shadow',
				placementClasses[placement]
			)}
		>
			{#each Object.entries(languages) as [code, label]}
				{@render item(code, label)}
			{/each}
		</ul>
	{/if}
</div>
