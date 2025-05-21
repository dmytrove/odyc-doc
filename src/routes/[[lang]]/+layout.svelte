<script lang="ts">
	import type { Snippet } from 'svelte'
	import '../../app.css'
	import 'codemirror-theme-vars/base.css'
	let { children }: { children: Snippet } = $props()
</script>

<div class="dark">
	{@render children()}
</div>
