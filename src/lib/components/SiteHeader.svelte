<script lang="ts">
	import { page } from '$app/state';
	import LanguageSelector from '$lib/components/LanguageSelector.svelte';
	import ThemeSelector from '$lib/components/ThemeSelector.svelte';
	import { grid } from '$lib/grid.svelte';
	import { t } from '$lib/language.svelte';

	const hasRail = $derived(page.url.pathname === '/');
</script>

<header
	class="sticky top-0 z-40 border-b border-[var(--rule)] bg-[var(--bg-paper)]/92 backdrop-blur-sm {hasRail
		? 'lg:pl-14'
		: ''}"
>
	<div
		class="mx-auto flex max-w-[1080px] flex-wrap items-center justify-between gap-x-4 gap-y-2.5 px-5 py-3 sm:px-8 md:gap-x-6 lg:grid lg:min-h-14 lg:grid-cols-12 lg:items-center lg:gap-x-6 lg:px-12 lg:py-0"
	>
		<a
			href="/"
			class="group inline-flex items-baseline gap-2.5 text-[var(--ink-primary)] transition-colors hover:text-[var(--accent-ink)] lg:col-span-4"
		>
			<span class="text-[15px] font-medium tracking-[-0.015em]">Martin Packbier</span>
			<span
				class="font-mono text-[11px] tracking-[0.05em] text-[var(--ink-muted)] uppercase transition-colors group-hover:text-[var(--accent-ink)]"
			>
				packbier.dev
			</span>
		</a>

		<nav
			aria-label="Global controls"
			class="flex flex-wrap items-center gap-2 sm:gap-2.5 lg:col-span-8 lg:justify-end"
		>
			<a
				href="https://blog.packbier.dev"
				target="_blank"
				rel="noopener noreferrer"
				aria-label={t('blog_aria')}
				class="inline-flex items-center gap-1 border border-[var(--rule)] px-2.5 py-1 font-mono text-[11px] tracking-[0.05em] text-[var(--ink-primary)] uppercase transition-colors duration-150 hover:border-[var(--accent-border)] hover:bg-[var(--bg-row-hover)] hover:text-[var(--accent-ink)]"
			>
				<span>{t('blog')}</span>
				<span aria-hidden="true">&#8599;</span>
			</a>

			<LanguageSelector />

			<ThemeSelector />

			<button
				type="button"
				onclick={() => grid.toggle()}
				aria-pressed={grid.enabled}
				aria-label="Toggle Swiss column grid overlay"
				class="cursor-pointer border px-2.5 py-1 font-mono text-[11px] tracking-[0.05em] uppercase transition-colors duration-150 {grid.enabled
					? 'border-[var(--accent-border)] bg-[var(--accent-soft-bg)] font-medium text-[var(--accent-ink)]'
					: 'border-[var(--rule)] text-[var(--ink-muted)] hover:border-[var(--rule-strong)] hover:text-[var(--ink-primary)]'}"
			>
				[{t('grid_label')}: {grid.enabled ? 'ON' : 'OFF'}]
			</button>
		</nav>
	</div>
</header>
