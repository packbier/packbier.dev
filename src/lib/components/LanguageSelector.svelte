<script lang="ts">
	import { language } from '$lib/language.svelte';

	const activeClass =
		'bg-black text-white shadow-md dark:bg-white dark:text-black dark:shadow-white/10';
	const inactiveClass =
		'text-black/70 hover:bg-black/10 hover:text-black dark:text-white/70 dark:hover:bg-white/15 dark:hover:text-white';
</script>

<div
	class="flex min-w-[120px] items-center gap-1 rounded-full border border-black/20 bg-black/5 p-1 backdrop-blur-sm transition-colors duration-300 dark:border-white/20 dark:bg-white/10"
>
	<button
		type="button"
		class="cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#0046ff] focus-visible:ring-offset-2 focus-visible:outline-none dark:focus-visible:ring-offset-black {language.get ===
		'en'
			? activeClass
			: inactiveClass}"
		onclick={() => language.set('en')}
		aria-label="Switch to English"
		aria-pressed={language.get === 'en'}
	>
		EN
	</button>

	<button
		type="button"
		class="cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#0046ff] focus-visible:ring-offset-2 focus-visible:outline-none dark:focus-visible:ring-offset-black {language.get ===
		'de'
			? activeClass
			: inactiveClass}"
		onclick={() => language.set('de')}
		aria-label="Switch to German"
		aria-pressed={language.get === 'de'}
	>
		DE
	</button>
</div>
