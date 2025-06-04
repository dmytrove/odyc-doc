<script lang="ts">
	import { page } from '$app/state'
	import { getLangFromUrl, getNeighborsPost, useTranslations } from '$lib'
	import { SquarePen } from '@steeze-ui/lucide-icons'
	import { Icon } from '@steeze-ui/svelte-icon'

	type Props = {
		filePath: string
	}

	let { filePath }: Props = $props()

	let pagination = $derived(getNeighborsPost(page.url))

	let lang = $derived(getLangFromUrl(page.url))
	const t = useTranslations(page.params.lang)
</script>

<footer class="mt-28 px-8">
	<div class="px-2">
		<a
			href="https://github.com/achtaitaipai/odyc-doc/edit/main/src/content/doc/{filePath}/{lang}.md"
			class="text-accent text-sm"
			><Icon src={SquarePen} class="mr-1 inline size-[1em]" /> {t('doc.edit')}</a
		>
	</div>
	<nav class="border-border mt-4 flex border-t px-2">
		{#if pagination.previous}
			<a href={pagination.previous.url} class="border-border flex items-center">
				<div class=" grid py-4">
					<span class="text-base-content/60 text-sm">{t('doc.previous')}</span>
					<span class="font-semi text-accent text-lg">{pagination.previous.title}</span>
				</div>
			</a>
		{/if}
		{#if pagination.next}
			<a href={pagination.next.url} class="border-border ml-auto flex items-center justify-end">
				<div class=" grid py-4">
					<span class="text-base-content/60 text-sm">{t('doc.next')}</span>
					<span class="font-semi text-accent text-lg">{pagination.next.title}</span>
				</div>
			</a>
		{/if}
	</nav>
</footer>
