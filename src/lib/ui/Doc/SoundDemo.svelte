<script lang="ts">
	import { Button } from '$lib'
	import { X } from '@steeze-ui/lucide-icons'
	import { Icon } from '@steeze-ui/svelte-icon'
	import { createSoundFromTemplate, playSound, TEMPLATES } from 'pfxr'
	import { onMount } from 'svelte'

	type TemplateKey = keyof typeof TEMPLATES
	type SoundData = {
		template: TemplateKey
		name: string
		seed: number
	}

	const templatesKeys = Object.keys(TEMPLATES).filter((el) => el !== 'DEFAULT') as TemplateKey[]

	let audioCtx: AudioContext

	onMount(() => {
		audioCtx = new AudioContext()
	})

	function play(template: TemplateKey) {
		if (!audioCtx) return
		const seed = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
		const sound = createSoundFromTemplate(TEMPLATES[template], seed)
		playSound(sound, audioCtx, audioCtx.destination)
	}
</script>

<div class="flex flex-wrap justify-start gap-3">
	{#each templatesKeys as name}
		<Button onclick={() => play(name)}>{name}</Button>
	{/each}
</div>
