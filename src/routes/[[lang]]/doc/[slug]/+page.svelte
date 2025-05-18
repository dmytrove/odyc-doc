<script lang="ts">
	import type { PageProps } from './$types'

	const { data }: PageProps = $props()
	const { Content } = data
</script>

<article class="prose mx-auto max-w-prose">
	<Content />
</article>
