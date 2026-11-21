<script lang="ts">
	import { untrack, type Snippet } from 'svelte';

	let {
		id,
		title,
		organization,
		location,
		period,
		badge,
		secondaryMeta,
		defaultOpen = false,
		children
	}: {
		id: string;
		title: string;
		organization: string;
		location?: string;
		period: string;
		badge?: string;
		secondaryMeta?: string;
		defaultOpen?: boolean;
		children: Snippet;
	} = $props();

	let open = $state(untrack(() => defaultOpen));
</script>

<div class="group relative border-b border-[var(--rule)]">
	<!-- Left accent indicator bar sitting in the column gutter -->
	<span
		aria-hidden="true"
		class="pointer-events-none absolute top-0 bottom-0 -left-2 z-10 w-0.5 bg-[var(--accent)] transition-opacity duration-150 sm:-left-3 {open
			? 'opacity-100'
			: 'opacity-0 group-hover:opacity-60'}"
	></span>

	<button
		type="button"
		id={`${id}-trigger`}
		aria-expanded={open}
		aria-controls={`${id}-panel`}
		onclick={() => (open = !open)}
		class="relative grid w-full cursor-pointer grid-cols-4 items-start gap-x-4 py-4 text-left md:grid-cols-8 md:items-center md:gap-x-6 lg:grid-cols-9"
	>
		<!-- Gutter-padded hover / open wash so text aligns flush to grid tracks -->
		<span
			aria-hidden="true"
			class="pointer-events-none absolute -inset-x-2 inset-y-0 -z-10 transition-colors duration-150 group-hover:bg-[var(--bg-row-hover)] sm:-inset-x-3 {open
				? 'bg-[var(--bg-row-hover)]'
				: ''}"
		></span>

		<div class="col-span-3 min-w-0 space-y-1 md:col-span-5 lg:col-span-5">
			<h3
				class="text-[15px] leading-snug font-medium tracking-[-0.01em] text-[var(--ink-primary)] sm:text-[16px]"
			>
				{title}
			</h3>

			<div class="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[13px] leading-snug">
				<span class="text-[var(--ink-secondary)]">{organization}</span>
				{#if location}
					<span aria-hidden="true" class="text-[var(--rule-strong)]">&middot;</span>
					<span class="font-mono text-[11px] tracking-[0.03em] text-[var(--ink-muted)]">
						{location}
					</span>
				{/if}
			</div>

			<div class="flex flex-wrap items-center gap-x-3 gap-y-1 pt-0.5 md:hidden">
				<span class="font-mono text-[11px] tracking-[0.04em] text-[var(--ink-muted)] uppercase">
					{period}
				</span>
				{#if secondaryMeta}
					<span
						class="font-mono text-[10.5px] tracking-[0.05em] text-[var(--accent-ink)] uppercase"
					>
						{secondaryMeta}
					</span>
				{/if}
				{#if badge}
					<span
						class="font-mono text-[10.5px] tracking-[0.05em] text-[var(--accent-ink)] uppercase"
					>
						{badge}
					</span>
				{/if}
			</div>
		</div>

		<div
			class="hidden min-w-0 md:col-span-2 md:flex md:flex-col md:items-start md:gap-1 lg:col-span-3"
		>
			<span
				class="font-mono text-[11px] leading-snug tracking-[0.04em] text-[var(--ink-muted)] uppercase"
			>
				{period}
			</span>
			{#if secondaryMeta || badge}
				<div class="flex flex-wrap items-center gap-x-2.5 gap-y-0.5">
					{#if secondaryMeta}
						<span
							class="font-mono text-[10.5px] tracking-[0.05em] text-[var(--accent-ink)] uppercase"
						>
							{secondaryMeta}
						</span>
					{/if}
					{#if badge}
						<span
							class="font-mono text-[10.5px] tracking-[0.05em] text-[var(--accent-ink)] uppercase"
						>
							{badge}
						</span>
					{/if}
				</div>
			{/if}
		</div>

		<div class="col-span-1 flex justify-end md:col-span-1 lg:col-span-1">
			<span
				aria-hidden="true"
				class="relative flex h-5 w-5 items-center justify-center text-[var(--ink-secondary)] transition-colors group-hover:text-[var(--ink-primary)] {open
					? 'text-[var(--accent-ink)]'
					: ''}"
			>
				<span class="block h-[1.5px] w-3 bg-current"></span>
				<span
					class="absolute block h-3 w-[1.5px] bg-current transition-transform duration-200 {open
						? 'scale-y-0'
						: 'scale-y-100'}"
				></span>
			</span>
		</div>
	</button>

	<div
		id={`${id}-panel`}
		role="region"
		aria-labelledby={`${id}-trigger`}
		data-open={open}
		class="accordion-panel"
	>
		<div class="accordion-inner">
			<div
				class="relative border-t border-[var(--rule)] py-4 text-[15px] leading-relaxed text-[var(--ink-secondary)]"
			>
				<div
					aria-hidden="true"
					class="pointer-events-none absolute -inset-x-2 inset-y-0 -z-10 bg-[var(--bg-surface)]/45 sm:-inset-x-3"
				></div>
				{@render children()}
			</div>
		</div>
	</div>
</div>
