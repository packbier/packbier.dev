<script lang="ts">
	import { onMount } from 'svelte';
	import type { NavSection } from '$lib/i18n';

	let { sections }: { sections: NavSection[] } = $props();

	let activeId = $state('intro');

	function scrollToSection(id: string) {
		activeId = id;
		const el = document.getElementById(id);
		if (!el) return;
		const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
	}

	onMount(() => {
		const ids = sections.map((s) => s.id);
		const elements = ids
			.map((id) => document.getElementById(id))
			.filter((el): el is HTMLElement => el !== null);

		if (elements.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

				if (visible.length > 0 && visible[0].target.id) {
					activeId = visible[0].target.id;
				}
			},
			{
				rootMargin: '-20% 0px -60% 0px',
				threshold: 0
			}
		);

		for (const el of elements) {
			observer.observe(el);
		}

		const onScroll = () => {
			if (window.scrollY < 48) {
				activeId = ids[0];
				return;
			}
			const nearBottom =
				window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 36;
			if (nearBottom) {
				activeId = ids[ids.length - 1];
			}
		};

		window.addEventListener('scroll', onScroll, { passive: true });

		return () => {
			observer.disconnect();
			window.removeEventListener('scroll', onScroll);
		};
	});
</script>

<!-- Desktop vertical rail -->
<nav
	aria-label="Section index"
	class="fixed top-14 bottom-0 left-0 z-30 hidden w-14 flex-col items-center justify-center gap-2 border-r border-[var(--rule)] bg-[var(--bg-paper)]/85 backdrop-blur-sm lg:flex"
>
	{#each sections as section (section.id)}
		{@const active = activeId === section.id}
		<button
			type="button"
			onclick={() => scrollToSection(section.id)}
			title={`${section.num} — ${section.label}`}
			aria-label={`${section.num} — ${section.label}`}
			aria-current={active ? 'location' : undefined}
			class="group relative flex h-10 w-full cursor-pointer items-center justify-center font-mono text-[11px] tracking-[0.05em] transition-colors duration-150 {active
				? 'font-medium text-[var(--accent-ink)]'
				: 'text-[var(--ink-muted)] hover:text-[var(--ink-primary)]'}"
		>
			<span
				aria-hidden="true"
				class="absolute top-2 bottom-2 left-0 w-0.5 bg-[var(--accent)] transition-opacity duration-150 {active
					? 'opacity-100'
					: 'opacity-0 group-hover:opacity-45'}"
			></span>
			<span>{section.num}</span>
			<span
				aria-hidden="true"
				class="pointer-events-none absolute left-full ml-2 border border-[var(--rule-strong)] bg-[var(--bg-paper)] px-2 py-1 text-[10px] tracking-[0.05em] whitespace-nowrap text-[var(--ink-primary)] uppercase opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
			>
				{section.label}
			</span>
		</button>
	{/each}
</nav>

<!-- Mobile & tablet bottom section bar -->
<nav
	aria-label="Section index"
	class="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-[var(--rule)] bg-[var(--bg-paper)]/95 backdrop-blur-sm lg:hidden"
>
	{#each sections as section (section.id)}
		{@const active = activeId === section.id}
		<button
			type="button"
			onclick={() => scrollToSection(section.id)}
			aria-label={`${section.num} — ${section.label}`}
			aria-current={active ? 'location' : undefined}
			class="relative flex h-11 cursor-pointer items-center justify-center font-mono text-[11px] tracking-[0.05em] transition-colors duration-150 {active
				? 'bg-[var(--bg-row-hover)] font-medium text-[var(--accent-ink)]'
				: 'text-[var(--ink-muted)] hover:text-[var(--ink-primary)]'}"
		>
			<span
				aria-hidden="true"
				class="absolute inset-x-3 top-0 h-0.5 bg-[var(--accent)] transition-opacity duration-150 {active
					? 'opacity-100'
					: 'opacity-0'}"
			></span>
			<span>{section.num}</span>
		</button>
	{/each}
</nav>
