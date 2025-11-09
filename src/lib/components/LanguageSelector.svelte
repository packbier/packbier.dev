<script lang="ts">
	import { language } from '$lib/language.svelte';

	function english() {
		language.set('en');
	}

	function german() {
		language.set('de');
	}

	const activeClass =
		'bg-black text-black shadow-md dark:bg-black dark:text-white dark:shadow-white/5';
	const inactiveClass = 'text-gray-300 hover:bg-black/10 dark:hover:bg-white/100';
</script>

<div
	class="language-selector flex items-center gap-1 rounded-full border border-black/20 bg-black/5 p-1 backdrop-blur-sm transition-colors duration-300 dark:border-white/20 dark:bg-white/10"
>
	<button
		class="language-btn rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 {language.get ===
		'en'
			? activeClass
			: inactiveClass}"
		on:click={() => english()}
		aria-label="Switch to English"
	>
		EN
	</button>

	<button
		class="language-btn rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 {language.get ===
		'de'
			? activeClass
			: inactiveClass}"
		on:click={() => german()}
		aria-label="Switch to German"
	>
		DE
	</button>
</div>

<style>
	.language-selector {
		min-width: 120px;
	}

	.language-btn {
		cursor: pointer;
		outline: none;
		border: none;
		background: transparent;
	}

	.language-btn:focus-visible {
		ring: 2px solid #46ff;
		ring-offset: 2px;
	}
</style>
