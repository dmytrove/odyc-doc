<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	export type Props = {
		label?: string;
		class?: string;
		checked?: boolean;
	};

	let { label, class: className, checked = $bindable(false) }: Props = $props();
</script>

<label class={twMerge('inline-flex cursor-pointer items-center', className)}>
	{#if label}
		<span class="me-3 text-gray-900 dark:text-gray-300">{label}</span>
	{/if}
	<input type="checkbox" value="" class="peer sr-only" bind:checked />
	<div
		class="peer relative h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-blue-600 peer-focus:ring-blue-300 peer-focus:outline-none after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-checked:bg-blue-600 dark:peer-focus:ring-blue-800"
	></div>
</label>
