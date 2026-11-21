<script lang="ts">
	import { language } from '$lib/language.svelte';
</script>

<div
	role="group"
	aria-label="Language"
	class="inline-flex items-center border border-[var(--rule)] bg-[var(--bg-surface)]/50 p-0.5 font-mono text-[11px] tracking-[0.05em] uppercase"
>
	<button
		type="button"
		onclick={() => language.set('en')}
		aria-label="Switch to English"
		aria-pressed={language.get === 'en'}
		class="cursor-pointer px-2 py-1 transition-colors duration-150 {language.get === 'en'
			? 'bg-[var(--accent-soft-bg)] font-medium text-[var(--accent-ink)]'
			: 'text-[var(--ink-muted)] hover:text-[var(--ink-primary)]'}"
	>
		EN
	</button>
	<span aria-hidden="true" class="h-3 w-px bg-[var(--rule)]"></span>
	<button
		type="button"
		onclick={() => language.set('de')}
		aria-label="Switch to German"
		aria-pressed={language.get === 'de'}
		class="cursor-pointer px-2 py-1 transition-colors duration-150 {language.get === 'de'
			? 'bg-[var(--accent-soft-bg)] font-medium text-[var(--accent-ink)]'
			: 'text-[var(--ink-muted)] hover:text-[var(--ink-primary)]'}"
	>
		DE
	</button>
</div>
