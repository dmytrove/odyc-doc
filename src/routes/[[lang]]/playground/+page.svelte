<script lang="ts">
	import { browser } from '$app/environment'
	import { page } from '$app/state'
	import { Playground } from '$lib'
	import Header from '$lib/ui/Header.svelte'
	import type { PageProps } from './$types'

	const { data }: PageProps = $props()

	const LOCALSTORAGEKEY = 'odyc-playground-save'

	const localCode = browser ? localStorage.getItem(LOCALSTORAGEKEY) : null

	let locales = [
		{ lang: 'english', url: '/playground' },
		{
			lang: 'français',
			url: '/fr/playground'
		}
	]

	const code =
		localCode ??
		`const game = createGame({
	player: {
		sprite: \`
			...00...
			...00...
			.000000.
			0.0000.0
			0.0000.0
			..0000..
			..0..0..
			..0..0..
			\`,
		position: [3, 1]
	},
	templates: {
		x: {
			sprite: 2
		}
	},
	map: \`
	xxxxxxxx
	x......x
	x......x
	x......x
	x......x
	x......x
	x......x
	xxxxxxxx
	\`})`
</script>

<div class="flex h-screen flex-col">
	{#key page.params.lang}
		<Header {locales} />
		<Playground
			class="h-full min-h-0 grow"
			examples={data.examples}
			{code}
			localStorageKey={LOCALSTORAGEKEY}
		/>
	{/key}
</div>
