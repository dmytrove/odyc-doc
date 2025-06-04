<script lang="ts">
	import { odycColors } from '$lib'
	type Props = {
		sprite: string
	}
	let { sprite }: Props = $props()
	let grid = $derived(
		sprite
			.replace(/'|"|`/gm, '')
			.trim() //removes whitespace from both ends
			.replace(/[ \t]/gm, '') //removes tabs and whitespaces
			.split(/\n+/gm) //split by lines and ignore multiple return
			.map((l) => l.split(''))
	)
</script>

<svg width="8" height="8" xmlns="http://www.w3.org/2000/svg">
	{#each grid as line, y}
		{#each line as char, x}
			{#if /\d/.test(char)}
				<rect width="1" height="1" {x} {y} fill={odycColors[+char]} />
			{/if}
		{/each}
	{/each}
</svg>
