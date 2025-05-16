<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	type Props = {
		label?: string;
	} & HTMLInputAttributes;
	let {
		label = $bindable(),
		min,
		max,
		value = $bindable(0),
		step,
		class: className,
		...props
	}: Props = $props();
	const id = crypto.randomUUID();
</script>

<div class={className}>
	{#if label}
		<label for={id} class="mb-0.5 block text-sm font-medium text-gray-900 dark:text-white"
			>{label}</label
		>
	{/if}
	<input
		{id}
		type="range"
		{min}
		{max}
		{step}
		bind:value
		class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-gray-900 dark:bg-gray-700 dark:accent-gray-100"
		{...props}
	/>
</div>
