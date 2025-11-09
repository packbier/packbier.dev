<script lang="ts">
	import { theme } from '$lib/theme.svelte';

	const activeClass =
		'bg-black text-black shadow-md dark:bg-black dark:text-white dark:shadow-white/5';
	const inactiveClass = 'text-gray-300 hover:bg-black/10 dark:hover:bg-white/100';
</script>

<div
	class="language-selector flex items-center gap-1 rounded-full border border-black/20 bg-black/5 p-1 backdrop-blur-sm transition-colors duration-300 dark:border-white/20 dark:bg-white/10"
>
	<button
		class="language-btn rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 {theme.get ===
		'light'
			? activeClass
			: inactiveClass}"
		on:click={() => theme.set('light')}
		aria-label="Switch to light theme"
	>
		Light
	</button>

	<button
		class="language-btn rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 {theme.get ===
		'dark'
			? activeClass
			: inactiveClass}"
		on:click={() => theme.set('dark')}
		aria-label="Switch to dark theme"
	>
		Dark
	</button>
</div>

<style>
	.language-btn {
		cursor: pointer;
		outline: none;
		border: none;
		background: transparent;
	}
</style>
