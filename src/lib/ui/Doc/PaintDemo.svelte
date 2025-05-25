<script>
	import { Paint } from '$lib'
	let sprite = $state(`
			..4.4...
			..4.4.4.
			..4.4.4.
			4.44444.
			4443434.
			.444444.
			..43344.
			..4444..
			`)
	let lines = $derived(sprite.replace(/\t|\r|`/g, '').split('\n'))
</script>

<div class="h-4" aria-hidden="true"></div>

<div class="not-prose mx-auto grid gap-6 md:grid-cols-2 md:gap-2">
	<Paint
		resize={false}
		copy={false}
		class="border-border w-auto border pb-8 "
		{sprite}
		onChange={(val) => (sprite = val)}
	/>
	<div
		class="bg-base-200 border-border flex w-full flex-col items-center justify-center border py-12 font-mono text-2xl"
	>
		{#each lines as line}
			<p>{line}</p>
		{/each}
	</div>
</div>
