<script lang="ts">
	import { run } from 'svelte/legacy'

	import { onMount, type Snippet } from 'svelte'

	type Props = {
		query: string
		children: Snippet<[boolean]>
	}

	let { query, children }: Props = $props()

	let mql: MediaQueryList
	let mqlListener: (e: MediaQueryListEvent) => any
	let wasMounted = $state(false)
	let matches = $state(false)

	onMount(() => {
		wasMounted = true
		return () => {
			removeActiveListener()
		}
	})

	function addNewListener(query: string) {
		mql = window.matchMedia(query)
		mqlListener = (v) => (matches = v.matches)
		mql.addListener(mqlListener)
		matches = mql.matches
	}

	function removeActiveListener() {
		if (mql && mqlListener) {
			mql.removeListener(mqlListener)
		}
	}
	run(() => {
		if (wasMounted) {
			removeActiveListener()
			addNewListener(query)
		}
	})
</script>

{@render children(matches)}
