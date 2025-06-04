<script lang="ts">
	import '@fontsource-variable/pixelify-sans'
	import 'codemirror-theme-vars/base.css'
	import { type Snippet } from 'svelte'
	import '../../app.css'
	let { children }: { children: Snippet } = $props()
</script>

<div class="bg-base-100">
	{@render children()}
</div>
