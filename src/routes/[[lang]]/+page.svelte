<script lang="ts">
	import { page } from '$app/state'
	import { defaultLang, getFirstDocPost, getLangFromUrl, Header, makeLocaleUrl } from '$lib'
	import Gallery from './Gallery.svelte'

	const lang = getLangFromUrl(page.url)
	let langPrefix = lang === defaultLang ? '' : '/' + lang + '/'
</script>

<Header />

<main class="pb-32">
	<section class="container mx-auto grid items-center gap-12 px-2 pt-44 lg:grid-cols-[7fr_4fr]">
		<div class="grid gap-6 text-center lg:text-left">
			<h1
				class="font-pixel decoration-base-content text-7xl font-bold text-[#228be6] underline underline-offset-8 md:text-9xl"
			>
				Odyc.js
			</h1>
			<p class="mt-4 text-4xl font-bold">Play to create Games.</p>
			<p class="max-w-prose text-xl">
				A small javascript library that lets you code video games even without programming
				experience.
			</p>
			<div class="mt-6 flex flex-wrap items-center justify-center gap-6 lg:justify-start">
				<a
					href="{langPrefix}playground/"
					class="bg-[#228be6] px-4 py-2 text-white transition-colors sm:text-lg">Create a game</a
				>
				<a
					href={getFirstDocPost(page.url)}
					class=" px-4 py-2 transition-colors hover:bg-gray-100 sm:text-lg">Explore the docs</a
				>
			</div>
		</div>
		<img src="/logo.jpeg" alt="" class="pixelated hidden w-full lg:block" />
	</section>

	<section class="mt-48 space-y-9">
		<h2 class="font-pixel text-center text-6xl font-bold sm:text-7xl">Gallery</h2>
		<Gallery />
	</section>
</main>
