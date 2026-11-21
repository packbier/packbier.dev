<script lang="ts">
	import type { EducationItem } from '$lib/i18n';

	let { item }: { item: EducationItem } = $props();

	let activeTab = $state<'main' | 'exchange'>('main');
</script>

<div class="space-y-4">
	{#if item.exchange}
		<div
			role="tablist"
			aria-label={`${item.degree} — ${item.institution}`}
			class="flex flex-wrap items-center gap-x-6 gap-y-1 border-b border-[var(--rule)]"
		>
			<button
				type="button"
				role="tab"
				id={`${item.id}-tab-main`}
				aria-selected={activeTab === 'main'}
				aria-controls={`${item.id}-tabpanel-main`}
				onclick={() => (activeTab = 'main')}
				class="-mb-px cursor-pointer border-b-2 py-2 pr-1 font-mono text-[11px] tracking-[0.05em] uppercase transition-colors duration-150 {activeTab ===
				'main'
					? 'border-[var(--accent)] font-medium text-[var(--ink-primary)]'
					: 'border-transparent text-[var(--ink-muted)] hover:text-[var(--ink-primary)]'}"
			>
				{item.exchange.mainTabLabel}
			</button>

			<button
				type="button"
				role="tab"
				id={`${item.id}-tab-exchange`}
				aria-selected={activeTab === 'exchange'}
				aria-controls={`${item.id}-tabpanel-exchange`}
				onclick={() => (activeTab = 'exchange')}
				class="-mb-px cursor-pointer border-b-2 px-1 py-2 font-mono text-[11px] tracking-[0.05em] uppercase transition-colors duration-150 {activeTab ===
				'exchange'
					? 'border-[var(--accent)] font-medium text-[var(--ink-primary)]'
					: 'border-transparent text-[var(--ink-muted)] hover:text-[var(--ink-primary)]'}"
			>
				{item.exchange.tabLabel}
			</button>
		</div>
	{/if}

	{#if !item.exchange || activeTab === 'main'}
		<div
			id={item.exchange ? `${item.id}-tabpanel-main` : undefined}
			role={item.exchange ? 'tabpanel' : undefined}
			aria-labelledby={item.exchange ? `${item.id}-tab-main` : undefined}
			class="space-y-3.5"
		>
			{#if item.summary}
				<p class="text-[15px] leading-[1.65] text-[var(--ink-primary)]">
					{item.summary}
				</p>
			{/if}

			{#if item.details && item.details.length > 0}
				<dl class="space-y-2">
					{#each item.details as detail (detail.label)}
						<div
							class="grid grid-cols-1 gap-y-0.5 md:grid-cols-8 md:items-baseline md:gap-x-6 lg:grid-cols-9"
						>
							<dt
								class="font-mono text-[11px] tracking-[0.05em] text-[var(--ink-muted)] uppercase md:col-span-2 lg:col-span-2"
							>
								{detail.label}
							</dt>
							<dd
								class="text-[15px] leading-[1.6] text-[var(--ink-primary)] md:col-span-6 lg:col-span-7"
							>
								{detail.value}
							</dd>
						</div>
					{/each}
				</dl>
			{/if}

			{#if item.modules && item.modules.length > 0}
				<div class="space-y-2 pt-0.5">
					{#if item.modulesLabel}
						<p class="font-mono text-[11px] tracking-[0.05em] text-[var(--ink-muted)] uppercase">
							{item.modulesLabel}
						</p>
					{/if}
					<div class="flex flex-wrap gap-1.5">
						{#each item.modules as mod (mod)}
							<span
								class="border border-[var(--rule)] bg-[var(--bg-paper)] px-2 py-0.5 font-mono text-[11px] tracking-[0.03em] text-[var(--ink-secondary)]"
							>
								{mod}
							</span>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	{:else if item.exchange}
		<div
			id={`${item.id}-tabpanel-exchange`}
			role="tabpanel"
			aria-labelledby={`${item.id}-tab-exchange`}
			class="space-y-3.5"
		>
			<div
				class="grid grid-cols-1 gap-y-2 border-b border-[var(--rule)] pb-3 md:grid-cols-8 md:items-start md:gap-x-6 lg:grid-cols-9"
			>
				<div class="space-y-0.5 md:col-span-5 lg:col-span-5">
					<p class="text-[15px] font-medium text-[var(--ink-primary)]">
						{item.exchange.institution}
					</p>
					<p class="font-mono text-[11px] tracking-[0.03em] text-[var(--ink-muted)]">
						{item.exchange.location}
					</p>
				</div>

				<div class="space-y-0.5 md:col-span-3 lg:col-span-4">
					<p class="font-mono text-[11px] tracking-[0.04em] text-[var(--ink-muted)] uppercase">
						{item.exchange.period}
					</p>
					{#if item.exchange.grade}
						<p class="font-mono text-[11px] tracking-[0.05em] text-[var(--accent-ink)] uppercase">
							{item.exchange.grade}
						</p>
					{/if}
				</div>
			</div>

			{#if item.exchange.summary}
				<p class="text-[15px] leading-[1.65] text-[var(--ink-primary)]">
					{item.exchange.summary}
				</p>
			{/if}

			{#if item.exchange.details && item.exchange.details.length > 0}
				<dl class="space-y-2">
					{#each item.exchange.details as detail (detail.label)}
						<div
							class="grid grid-cols-1 gap-y-0.5 md:grid-cols-8 md:items-baseline md:gap-x-6 lg:grid-cols-9"
						>
							<dt
								class="font-mono text-[11px] tracking-[0.05em] text-[var(--ink-muted)] uppercase md:col-span-2 lg:col-span-2"
							>
								{detail.label}
							</dt>
							<dd
								class="text-[15px] leading-[1.6] text-[var(--ink-primary)] md:col-span-6 lg:col-span-7"
							>
								{detail.value}
							</dd>
						</div>
					{/each}
				</dl>
			{/if}

			{#if item.exchange.modules && item.exchange.modules.length > 0}
				<div class="space-y-2 pt-0.5">
					{#if item.exchange.modulesLabel}
						<p class="font-mono text-[11px] tracking-[0.05em] text-[var(--ink-muted)] uppercase">
							{item.exchange.modulesLabel}
						</p>
					{/if}
					<div class="flex flex-wrap gap-1.5">
						{#each item.exchange.modules as mod (mod)}
							<span
								class="border border-[var(--rule)] bg-[var(--bg-paper)] px-2 py-0.5 font-mono text-[11px] tracking-[0.03em] text-[var(--ink-secondary)]"
							>
								{mod}
							</span>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	{/if}
</div>
