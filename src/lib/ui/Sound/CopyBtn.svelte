<script lang="ts">
	import { Button } from '$lib'
	import { Clipboard, Check } from '@steeze-ui/lucide-icons'
	import { Icon } from '@steeze-ui/svelte-icon'

	type Props = {
		toCopy: string
	}

	let { toCopy }: Props = $props()
	let copied = $state(false)
	let timeOutId: ReturnType<typeof setTimeout> | undefined = undefined

	function handleClick() {
		navigator.clipboard.writeText(toCopy)
		copied = true
		if (timeOutId) clearTimeout(timeOutId)
		timeOutId = setTimeout(() => {
			copied = false
			timeOutId = undefined
		}, 1000)
	}
</script>

<Button
	size="icon"
	variant="ghost"
	tooltip={{ text: 'Copy', delay: 1 }}
	onclick={handleClick}
	class="hover:bg-transparent"
>
	<Icon src={copied ? Check : Clipboard} />
</Button>
