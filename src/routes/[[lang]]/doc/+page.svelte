<script lang="ts">
	import { page } from '$app/state'
	import type { PageProps } from './$types'

	let { data }: PageProps = $props()
</script>

<p>{page.params.lang === undefined}</p>
