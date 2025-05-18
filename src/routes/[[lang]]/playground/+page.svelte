<script lang="ts">
	import { Playground } from '$lib'
	import type { PageProps } from './$types'

	const { data }: PageProps = $props()
</script>

<Playground class="h-screen" examples={data.examples} code={data.code} />
