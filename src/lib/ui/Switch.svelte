<script lang="ts">
	import { twMerge } from 'tailwind-merge'

	export type Props = {
		label?: string
		class?: string
		checked?: boolean
	}

	let { label, class: className, checked = $bindable(false) }: Props = $props()
</script>

<label class={twMerge('inline-flex cursor-pointer items-center', className)}>
	{#if label}
		<span class="text-base-content me-3">{label}</span>
	{/if}
	<input type="checkbox" value="" class="peer sr-only" bind:checked />
	<div
		class="peer after:bg-base-100 bg-base-300 border-border peer-focus:ring-ring after:border-border peer-checked:after:border-border relative h-6 w-11 rounded-full border peer-checked:bg-blue-600 peer-focus:outline-none after:absolute after:start-[-1px] after:top-[-1px] after:h-6 after:w-6 after:rounded-full after:border after:transition-all after:content-[''] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full"
	></div>
</label>
