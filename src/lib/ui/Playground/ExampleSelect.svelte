<script lang="ts">
	import { page } from '$app/state'
	import { Select, useTranslations } from '$lib'

	export type Props = {
		onChange: (code: string) => void
		examples: {
			name: string
			id: string
			category: string
			getContent: () => Promise<string>
		}[]
	}

	const t = useTranslations(page.params.lang)

	let { onChange: load, examples }: Props = $props()

	const categories = [...new Set(examples.map((el) => el.category))]

	async function onSelectExample(e: Event & { currentTarget: EventTarget & HTMLSelectElement }) {
		const id = e.currentTarget.value
		const current = examples.find((el) => el.id === id)
		if (!current) return null
		const code = await current.getContent()
		if (!code) return
		load(code)
		const url = page.url
		url.searchParams.set('q', id)
		window.history.replaceState({}, '', url)
	}
</script>

<Select onchange={onSelectExample} value={t('playground.loadExample')}>
	<option>{t('playground.loadExample')}</option>
	{#each categories as category}
		<optgroup label={category}>
			{#each examples.filter((el) => el.category === category) as { name, id }}
				<option value={id}>{name}</option>
			{/each}
		</optgroup>
	{/each}
</Select>
