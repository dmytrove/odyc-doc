<script lang="ts">
	import type { Snippet } from 'svelte'
	import '../../app.css'
	import 'codemirror-theme-vars/base.css'
	import '@fontsource-variable/pixelify-sans'
	let { children }: { children: Snippet } = $props()
</script>

<div class="drk bg-base-100">
	{@render children()}
</div>
