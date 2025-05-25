<script lang="ts">
	import { odycColors } from '$lib/colors'
</script>

<div class="flex flex-wrap">
	{#each odycColors as color, i}
		<button
			class="grid aspect-square h-auto w-32 cursor-pointer place-content-center transition-transform hover:scale-95 active:scale-90"
			style="background-color: {color};"
			onclick={() => navigator.clipboard.writeText(color)}
		>
			<div class="grid gap-1 text-white mix-blend-difference">
				<span class="text-xl font-bold">{i}</span>
				<span class="italic">{color}</span>
			</div>
		</button>
	{/each}
</div>
