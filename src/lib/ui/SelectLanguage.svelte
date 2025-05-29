<script lang="ts">
	import { onNavigate } from '$app/navigation'
	import { page } from '$app/state'
	import { getLangFromUrl, languages, useTranslations } from '$lib'
	import { click_outside } from '$lib/actions/clickOutside'
	import { Languages } from '@steeze-ui/lucide-icons'
	import { Icon } from '@steeze-ui/svelte-icon'
	import { fade } from 'svelte/transition'
	import { twMerge } from 'tailwind-merge'

	type Props = {
		items: { url: string; lang: string }[]
	}
	let { items }: Props = $props()
	let isOpen = $state(false)
	const lang = getLangFromUrl(page.url)
	const t = useTranslations(lang)

	onNavigate(() => {
		isOpen = false
	})
</script>

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
			class="bg-base-100 border-border absolute top-full right-0 z-50 space-y-2 rounded-sm px-3 py-2 shadow"
		>
			{#each items as { url, lang }}
				<li>
					<a
						href={url}
						class={twMerge(
							'text-base-content/70 hover:text-base-content capitalize',
							page.url.pathname === url && 'text-base-content'
						)}>{lang}</a
					>
				</li>
			{/each}
		</ul>
	{/if}
</div>
