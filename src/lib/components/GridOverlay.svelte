<script lang="ts">
	import { page } from '$app/state';
	import { grid } from '$lib/grid.svelte';

	const columns = Array.from({ length: 12 }, (_, index) => String(index + 1).padStart(2, '0'));

	const hasRail = $derived(page.url.pathname === '/');
</script>

{#if grid.enabled}
	<div
		aria-hidden="true"
		class="pointer-events-none fixed inset-0 z-30 {hasRail ? 'lg:pl-14' : ''}"
	>
		<div class="mx-auto h-full max-w-[1080px] px-5 sm:px-8 lg:px-12">
			<div class="grid h-full grid-cols-4 gap-x-4 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12">
				{#each columns as col, index (col)}
					<div
						class="relative h-full border-x border-[var(--grid-line)] {index >= 4
							? 'hidden md:block'
							: ''} {index >= 8 ? 'md:hidden lg:block' : ''}"
					>
						<span
							class="block pt-16 pl-1.5 font-mono text-[9px] tracking-[0.06em] text-[var(--ink-muted)] opacity-55 select-none"
						>
							{col}
						</span>
					</div>
				{/each}
			</div>
		</div>
	</div>
{/if}
