<script lang="ts">
	import { language, t } from '$lib/language.svelte';

	const isDe = $derived(language.get === 'de');
</script>

<svelte:head>
	<title>{isDe ? 'Impressum & Credits | Martin Packbier' : 'Credits | Martin Packbier'}</title>
	<meta
		name="description"
		content={isDe
			? 'Impressum, verwendete Open-Source-Technologien und Schriftarten für packbier.dev'
			: 'Credits, open-source tooling, typography, and contact details for packbier.dev'}
	/>
</svelte:head>

<main class="mx-auto max-w-[1080px] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
	<div class="mb-10 flex flex-wrap items-center justify-between gap-4">
		<a
			href="/"
			class="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.05em] text-[var(--ink-muted)] uppercase transition-colors hover:text-[var(--accent-ink)]"
		>
			<span aria-hidden="true">&larr;</span>
			<span>{t('back_home')}</span>
		</a>

		<span class="font-mono text-[11px] tracking-[0.05em] text-[var(--ink-muted)] uppercase">
			{isDe ? 'RECHTLICHES / IMPRESSUM & CREDITS' : 'COLOPHON / CREDITS'}
		</span>
	</div>

	<header class="mb-10 space-y-3">
		<h1 class="text-3xl font-semibold tracking-[-0.02em] text-[var(--ink-primary)] sm:text-4xl">
			{isDe ? 'Impressum & Credits' : 'Credits'}
		</h1>
		<p class="max-w-[64ch] text-[15px] leading-relaxed text-[var(--ink-secondary)]">
			{isDe
				? 'Angaben zum Betreiber, Quellcode, eingesetzte Open-Source-Bibliotheken und Typografie für packbier.dev.'
				: 'Source code, open-source frameworks, typography, hosting, and contact details for packbier.dev.'}
		</p>
	</header>

	<div class="border-t border-[var(--rule)]">
		<section
			class="grid grid-cols-1 gap-x-4 gap-y-4 border-b border-[var(--rule)] py-7 md:gap-x-6 lg:grid-cols-12"
		>
			<h2
				class="font-mono text-[11px] font-medium tracking-[0.06em] text-[var(--ink-muted)] uppercase lg:col-span-3"
			>
				{isDe ? '01 / Quellcode' : '01 / Source Code'}
			</h2>
			<div class="space-y-2 text-[15px] text-[var(--ink-secondary)] lg:col-span-9">
				<a
					href="https://github.com/packbier/packbier.dev"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-1.5 font-mono text-[13px] text-[var(--ink-primary)] underline decoration-[var(--accent)] underline-offset-4 transition-colors hover:text-[var(--accent-ink)]"
				>
					<span>github.com/packbier/packbier.dev</span>
					<span aria-hidden="true">&#8599;</span>
				</a>
			</div>
		</section>

		<section
			class="grid grid-cols-1 gap-x-4 gap-y-4 border-b border-[var(--rule)] py-7 md:gap-x-6 lg:grid-cols-12"
		>
			<h2
				class="font-mono text-[11px] font-medium tracking-[0.06em] text-[var(--ink-muted)] uppercase lg:col-span-3"
			>
				{isDe ? '02 / Frameworks & Werkzeuge' : '02 / Frameworks & Tooling'}
			</h2>
			<ul class="space-y-2.5 text-[15px] text-[var(--ink-secondary)] lg:col-span-9">
				<li class="flex flex-wrap items-baseline gap-x-3">
					<a
						href="https://svelte.dev/docs/kit"
						target="_blank"
						rel="noopener noreferrer"
						class="font-medium text-[var(--ink-primary)] underline decoration-[var(--accent)] underline-offset-4 transition-colors hover:text-[var(--accent-ink)]"
					>
						SvelteKit &#8599;
					</a>
					<span class="font-mono text-[11px] tracking-[0.04em] text-[var(--ink-muted)] uppercase">
						{isDe ? 'Statisches App-Framework' : 'Static site framework'}
					</span>
				</li>
				<li class="flex flex-wrap items-baseline gap-x-3">
					<a
						href="https://tailwindcss.com/"
						target="_blank"
						rel="noopener noreferrer"
						class="font-medium text-[var(--ink-primary)] underline decoration-[var(--accent)] underline-offset-4 transition-colors hover:text-[var(--accent-ink)]"
					>
						Tailwind CSS &#8599;
					</a>
					<span class="font-mono text-[11px] tracking-[0.04em] text-[var(--ink-muted)] uppercase">
						{isDe ? 'Utility-First CSS' : 'Utility-first styling'}
					</span>
				</li>
			</ul>
		</section>

		<section
			class="grid grid-cols-1 gap-x-4 gap-y-4 border-b border-[var(--rule)] py-7 md:gap-x-6 lg:grid-cols-12"
		>
			<h2
				class="font-mono text-[11px] font-medium tracking-[0.06em] text-[var(--ink-muted)] uppercase lg:col-span-3"
			>
				{isDe ? '03 / Typografie' : '03 / Typography'}
			</h2>
			<ul class="space-y-2.5 text-[15px] text-[var(--ink-secondary)] lg:col-span-9">
				<li class="flex flex-wrap items-baseline gap-x-3">
					<a
						href="https://vercel.com/font"
						target="_blank"
						rel="noopener noreferrer"
						class="font-medium text-[var(--ink-primary)] underline decoration-[var(--accent)] underline-offset-4 transition-colors hover:text-[var(--accent-ink)]"
					>
						Geist &amp; Geist Mono &#8599;
					</a>
					<span class="font-mono text-[11px] tracking-[0.04em] text-[var(--ink-muted)] uppercase">
						SIL OFL 1.1 · {isDe ? 'Lokal via Fontsource' : 'Self-hosted via Fontsource'}
					</span>
				</li>
			</ul>
		</section>

		<section
			class="grid grid-cols-1 gap-x-4 gap-y-4 border-b border-[var(--rule)] py-7 md:gap-x-6 lg:grid-cols-12"
		>
			<h2
				class="font-mono text-[11px] font-medium tracking-[0.06em] text-[var(--ink-muted)] uppercase lg:col-span-3"
			>
				04 / Hosting
			</h2>
			<ul class="space-y-2 text-[15px] text-[var(--ink-secondary)] lg:col-span-9">
				<li>
					<a
						href="https://pages.cloudflare.com/"
						target="_blank"
						rel="noopener noreferrer"
						class="font-medium text-[var(--ink-primary)] underline decoration-[var(--accent)] underline-offset-4 transition-colors hover:text-[var(--accent-ink)]"
					>
						Cloudflare Pages &#8599;
					</a>
				</li>
			</ul>
		</section>

		<section
			class="grid grid-cols-1 gap-x-4 gap-y-4 border-b border-[var(--rule)] py-7 md:gap-x-6 lg:grid-cols-12"
		>
			<h2
				class="font-mono text-[11px] font-medium tracking-[0.06em] text-[var(--ink-muted)] uppercase lg:col-span-3"
			>
				{isDe ? '05 / Kontakt (Impressum)' : '05 / Contact (Impressum)'}
			</h2>
			<div class="space-y-1.5 text-[15px] text-[var(--ink-secondary)] lg:col-span-9">
				<p class="font-medium text-[var(--ink-primary)]">Martin Packbier</p>
				<p>
					<a
						href="mailto:packbier.martin@gmail.com"
						class="font-mono text-[13px] text-[var(--ink-primary)] underline decoration-[var(--accent)] underline-offset-4 transition-colors hover:text-[var(--accent-ink)]"
					>
						packbier.martin@gmail.com
					</a>
				</p>
				<p class="pt-1 text-[14px] text-[var(--ink-muted)]">
					{isDe
						? 'Rein private, nicht-kommerzielle persönliche Portfolio-Website.'
						: 'Strictly personal, non-commercial portfolio website.'}
				</p>
			</div>
		</section>
	</div>

	<div class="mt-10">
		<a
			href="/"
			class="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.05em] text-[var(--ink-muted)] uppercase transition-colors hover:text-[var(--accent-ink)]"
		>
			<span aria-hidden="true">&larr;</span>
			<span>{t('back_home')}</span>
		</a>
	</div>
</main>
