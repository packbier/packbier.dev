<script lang="ts">
	import { theme } from '$lib/theme.svelte';

	const activeClass =
		'bg-black text-white shadow-md dark:bg-white dark:text-black dark:shadow-white/10';
	const inactiveClass =
		'text-black/70 hover:bg-black/10 hover:text-black dark:text-white/70 dark:hover:bg-white/15 dark:hover:text-white';
</script>

<div
	class="flex items-center gap-1 rounded-full border border-black/20 bg-black/5 p-1 backdrop-blur-sm transition-colors duration-300 dark:border-white/20 dark:bg-white/10"
>
	<button
		type="button"
		class="cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#0046ff] focus-visible:ring-offset-2 focus-visible:outline-none dark:focus-visible:ring-offset-black {theme.get ===
		'light'
			? activeClass
			: inactiveClass}"
		onclick={() => theme.set('light')}
		aria-label="Switch to light theme"
		aria-pressed={theme.get === 'light'}
	>
		Light
	</button>

	<button
		type="button"
		class="cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#0046ff] focus-visible:ring-offset-2 focus-visible:outline-none dark:focus-visible:ring-offset-black {theme.get ===
		'dark'
			? activeClass
			: inactiveClass}"
		onclick={() => theme.set('dark')}
		aria-label="Switch to dark theme"
		aria-pressed={theme.get === 'dark'}
	>
		Dark
	</button>
</div>
