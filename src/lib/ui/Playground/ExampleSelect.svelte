<script lang="ts">
	import { Select } from '$lib'
	import { onMount } from 'svelte'

	type Props = {
		onChange: (code: string) => void
	}

	let { onChange: load }: Props = $props()

	const rawExamples = import.meta.glob('../../../content/examples/*/*.js', {
		query: '?raw',
		import: 'default'
	})

	const examplesPathes = Object.keys(rawExamples)
	const categories = [...new Set(examplesPathes.map(getDirname).filter((el) => el !== undefined))]

	function getDirname(path: string) {
		return path.match(/[\w-]+(?=\/[\w-]+\.js)/gm)?.[0]
	}

	function getFilename(path: string) {
		return path.match(/[\w-]+?(?=\.js)/)?.[0]
	}

	function toDisplay(text: string) {
		return (text.charAt(0).toUpperCase() + String(text).slice(1)).replace(/-/g, ' ')
	}

	async function onSelectExample(e: Event & { currentTarget: EventTarget & HTMLSelectElement }) {
		const path = e.currentTarget.value
		const current = rawExamples[path]
		if (!current) return null
		const code = (await current()) as string
		if (!code) return
		if (code) load(code)
	}
</script>

<Select onchange={onSelectExample} value="Load Example">
	<option>Load Example</option>
	{#each categories as category}
		<optgroup label={toDisplay(category)}>
			{#each examplesPathes.filter((el) => el.includes(category)) as path}
				<option value={path} class="capitalize">{toDisplay(getFilename(path) ?? '')}</option>
			{/each}
		</optgroup>
	{/each}
</Select>
