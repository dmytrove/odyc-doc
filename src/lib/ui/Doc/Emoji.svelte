<script lang="ts">
	import { icons } from '../../emojis.json'
	import { twMerge } from 'tailwind-merge'

	type Props = {
		src: string
	}

	let { src }: Props = $props()

	function getCode(emoji: string) {
		const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' })
		const segments = [...segmenter.segment(emoji)]
		const codePoints = []

		for (const segment of segments) {
			for (const cp of segment.segment) {
				codePoints.push(cp.codePointAt(0)?.toString(16))
			}
		}

		return codePoints.join('_')
	}
</script>

{#if icons.find((el) => el.codepoint === getCode(src))}
	<img
		src="/emojis/{getCode(src)}.webp"
		alt={src}
		class={twMerge('not-prose mr-1 inline h-[1.5em]')}
	/>
{:else}
	<span class={twMerge('not-prose mr-1 inline text-[1.5em]')}>{src}</span>
{/if}
