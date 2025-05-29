<script lang="ts">
	let key = $state('')
</script>

<svelte:window onkeydown={(e) => (key = e.code)} />

<div
	class="border-border bg-base-200 grid h-32 place-content-center border font-mono text-lg font-bold"
>
	{key}
</div>
