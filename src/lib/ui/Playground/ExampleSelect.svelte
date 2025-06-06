<script lang="ts">
	import { page } from '$app/state'
	import { Select, useTranslations } from '$lib'
	import { onMount } from 'svelte'

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

	onMount(async () => {
		const exampleId = page.url.hash
		if (exampleId) {
			const example = examples.find((el) => exampleId === '#' + el.id)
			const code = await example?.getContent()
			if (code) load(code)
		}
	})

	async function onSelectExample(e: Event & { currentTarget: EventTarget & HTMLSelectElement }) {
		const id = e.currentTarget.value
		const current = examples.find((el) => el.id === id)
		if (!current) return null
		const code = await current.getContent()
		if (!code) return
		load(code)
		location.hash = id
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
