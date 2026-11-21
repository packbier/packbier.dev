<script lang="ts">
	import { page } from '$app/state';
	import { t } from '$lib/language.svelte';

	const year = new Date().getFullYear();
	const hasRail = $derived(page.url.pathname === '/');
</script>

<footer class="border-t border-[var(--rule)] {hasRail ? 'pb-12 lg:pb-0 lg:pl-14' : ''}">
	<div
		class="mx-auto grid max-w-[1080px] grid-cols-1 gap-x-4 gap-y-4 px-5 py-7 sm:px-8 md:gap-x-6 lg:grid-cols-12 lg:items-center lg:px-12"
	>
		<p
			class="font-mono text-[11px] tracking-[0.05em] text-[var(--ink-muted)] uppercase lg:col-span-3"
		>
			&copy; {year} Martin Packbier
		</p>

		<nav
			aria-label="Footer links"
			class="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] tracking-[0.05em] uppercase lg:col-span-9"
		>
			<a
				href="https://blog.packbier.dev"
				target="_blank"
				rel="noopener noreferrer"
				class="text-[var(--ink-secondary)] transition-colors hover:text-[var(--accent-ink)]"
			>
				{t('blog')} &#8599;
			</a>
			<a
				href="https://linkedin.com/in/packbier"
				target="_blank"
				rel="noopener noreferrer"
				class="text-[var(--ink-secondary)] transition-colors hover:text-[var(--accent-ink)]"
			>
				LinkedIn &#8599;
			</a>
			<a
				href="mailto:packbier.martin@gmail.com"
				class="text-[var(--ink-secondary)] transition-colors hover:text-[var(--accent-ink)]"
			>
				{t('contact_email_label')}
			</a>
			<a
				href="/credits/"
				class="text-[var(--ink-secondary)] transition-colors hover:text-[var(--accent-ink)]"
			>
				{t('credits_label')}
			</a>
			<a
				href="/privacy/"
				class="text-[var(--ink-secondary)] transition-colors hover:text-[var(--accent-ink)]"
			>
				{t('privacy_label')}
			</a>
		</nav>
	</div>
</footer>
