<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements'
	type Props = {
		label?: string
	} & HTMLInputAttributes
	let {
		label = $bindable(),
		min,
		max,
		value = $bindable(0),
		step,
		class: className,
		...props
	}: Props = $props()
	const id = crypto.randomUUID()
</script>

<div class={className}>
	{#if label}
		<label for={id} class="text-base-content mb-0.5 block text-sm font-medium">{label}</label>
	{/if}
	<input
		{id}
		type="range"
		{min}
		{max}
		{step}
		bind:value
		class="bg-base-300 ring-ring accent-base-content h-2 w-full cursor-pointer appearance-none rounded-lg focus:ring"
		{...props}
	/>
</div>
