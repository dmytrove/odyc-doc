<script lang="ts">
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
				codePoints.push(cp.codePointAt(0).toString(16))
			}
		}

		return codePoints.join('_')
	}
</script>

<img src="/emojis/{getCode(src)}.webp" alt={src} class="not-prose mr-1 inline h-[1.5em]" />
