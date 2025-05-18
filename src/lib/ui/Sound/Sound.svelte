<script lang="ts">
	import { Button } from '$lib'
	import { createSoundFromTemplate, playSound, TEMPLATES } from 'pfxr'
	import { onMount } from 'svelte'
	import { Clipboard, Icon, Trash } from 'svelte-hero-icons'
	import CopyBtn from './CopyBtn.svelte'

	type TemplateKey = keyof typeof TEMPLATES
	type SoundData = {
		template: TemplateKey
		name: string
		seed: number
	}

	const templatesKeys = Object.keys(TEMPLATES).filter((el) => el !== 'DEFAULT') as TemplateKey[]

	let audioCtx: AudioContext
	let sounds: SoundData[] = $state([])
	let selected: number | undefined = $state()

	onMount(() => {
		audioCtx = new AudioContext()
	})

	function createSound(template: TemplateKey) {
		const seed = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
		const nameSuffix =
			Math.max(
				0,
				...sounds
					.filter((el) => {
						const reg = new RegExp(`^${template} \\d+$`)
						return reg.test(el.name)
					})
					.map((el) => Number(el.name.match(/\d+/)))
			) + 1
		const newSound = {
			template,
			seed,
			name: template + ' ' + nameSuffix
		}
		sounds = [newSound, ...sounds]
		selectAndPlay(0)
	}

	function remove(index: number) {
		sounds = sounds.filter((_, i) => i !== index)
		if (selected && selected > sounds.length) selected = 0
		if (sounds.length <= 0) selected = undefined
	}
	function play(index: number) {
		if (!audioCtx) return
		const data = sounds[index]
		if (!data) return
		const sound = createSoundFromTemplate(TEMPLATES[data.template], data.seed)
		playSound(sound, audioCtx, audioCtx.destination)
	}

	function selectAndPlay(index: number) {
		if (!sounds[index]) return
		selected = index
		play(selected)
	}
</script>

<div class="w-sm px-4 py-4">
	<ul
		class="bg-base-200 text-base-content border-border/10 flex h-40 flex-col overflow-auto border py-2"
	>
		{#each sounds as sound, i}
			<li class={['flex', selected === i && 'bg-base-300 font-bold']}>
				<button
					class={['grow cursor-pointer px-2 py-1 text-left text-sm']}
					onclick={() => selectAndPlay(i)}>{sound.name}</button
				>
				<CopyBtn toCopy="createSound('{sound.template}', {sound.seed})" />
				<Button
					size="icon"
					variant="ghost"
					tooltip={{ text: 'Delete', delay: 1 }}
					onclick={() => remove(i)}
					class="hover:bg-transparent"
				>
					<Icon src={Trash} />
				</Button>
			</li>
		{/each}
	</ul>
	<div class="mt-4 flex flex-wrap gap-3">
		{#each templatesKeys as name}
			<Button size="sm" onclick={() => createSound(name)}>{name}</Button>
		{/each}
	</div>
</div>
