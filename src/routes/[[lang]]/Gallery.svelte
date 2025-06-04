<script lang="ts">
	import { ChevronLeft, ChevronRight } from '@steeze-ui/heroicons'
	import { Icon } from '@steeze-ui/svelte-icon'
	import EmblaCarousel from 'embla-carousel'
	import { onMount } from 'svelte'

	let wrapper: HTMLElement | undefined = $state()
	let carousel: ReturnType<typeof EmblaCarousel>

	onMount(() => {
		if (wrapper) {
			carousel = EmblaCarousel(wrapper, { loop: true })
		}
	})

	const games = [
		{ img: 'cdlr.png', url: 'https://jjjbon.itch.io/codedelaroute' },
		{ img: 'dodog.png', url: 'https://achtaitaipai.github.io/odyc-exemples/games/dodog.html' },
		{ img: 'morning.png', url: 'https://achtaitaipai.github.io/odyc-exemples/games/matin.html' },
		{ img: 'vroum.png', url: 'https://achtaitaipai.github.io/odyc-exemples/games/vroum.html' },
		{
			img: 'maison-hantee.png',
			url: 'https://achtaitaipai.github.io/odyc-exemples/games/maison-hantee.html'
		},
		{
			img: 'the-sweeper.png',
			url: 'https://achtaitaipai.github.io/odyc-exemples/games/balayeur.html'
		},
		{ img: 'island.png', url: 'https://achtaitaipai.github.io/odyc-exemples/games/island.html' },
		{ img: 'space-bar.png', url: 'https://jjjbon.itch.io/spacebar-odyc-beta' },
		{ img: 'emily.png', url: 'https://goupilette.itch.io/emily-sest-perdue' },
		{
			img: 'john-wick.png',
			url: 'https://achtaitaipai.github.io/odyc-exemples/games/john-wick.html'
		},
		{
			img: 'mushroom.png',
			url: 'https://achtaitaipai.github.io/odyc-exemples/games/mushroom.html'
		}
	]
</script>

<div class="overflow-hidden" bind:this={wrapper}>
	<div class="flex gap-4 py-12 ps-8">
		{#each games as { img, url }}
			<a class="group min-w-0 shrink-0 grow-0" href={url} target="_blank">
				<img
					alt=""
					src="/gallery/{img}"
					class="h-[14rem] w-auto rotate-6 transition-transform duration-300 group-odd:-rotate-6 group-hover:scale-105 sm:h-[28rem]"
				/>
			</a>
		{/each}
	</div>
</div>
<div class="mt-4 flex justify-center gap-6">
	<button
		class="text-base-content/80 hover:text-base-content cursor-pointer"
		onclick={() => carousel.scrollPrev()}><Icon src={ChevronLeft} class="size-7" /></button
	>
	<button
		class="text-base-content/80 hover:text-base-content cursor-pointer"
		onclick={() => carousel.scrollNext()}><Icon src={ChevronRight} class="size-7" /></button
	>
</div>
