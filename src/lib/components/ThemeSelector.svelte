<script lang="ts">
	import { t } from '$lib/language.svelte';
	import { theme } from '$lib/theme.svelte';
</script>

<div
	role="group"
	aria-label="Color theme"
	class="inline-flex items-center border border-[var(--rule)] bg-[var(--bg-surface)]/50 p-0.5 font-mono text-[11px] tracking-[0.05em] uppercase"
>
	<button
		type="button"
		onclick={() => theme.set('light')}
		aria-label="Switch to light theme"
		aria-pressed={theme.get === 'light'}
		class="cursor-pointer px-2 py-1 transition-colors duration-150 {theme.get === 'light'
			? 'bg-[var(--accent-soft-bg)] font-medium text-[var(--accent-ink)]'
			: 'text-[var(--ink-muted)] hover:text-[var(--ink-primary)]'}"
	>
		{t('theme_light')}
	</button>
	<span aria-hidden="true" class="h-3 w-px bg-[var(--rule)]"></span>
	<button
		type="button"
		onclick={() => theme.set('dark')}
		aria-label="Switch to dark theme"
		aria-pressed={theme.get === 'dark'}
		class="cursor-pointer px-2 py-1 transition-colors duration-150 {theme.get === 'dark'
			? 'bg-[var(--accent-soft-bg)] font-medium text-[var(--accent-ink)]'
			: 'text-[var(--ink-muted)] hover:text-[var(--ink-primary)]'}"
	>
		{t('theme_dark')}
	</button>
</div>
