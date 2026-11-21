<script lang="ts">
	let {
		title,
		company,
		start,
		end,
		period,
		description,
		details = []
	}: {
		title: string;
		company: string;
		start?: string;
		end?: string;
		period?: string;
		description: string;
		details?: string[];
	} = $props();
</script>

<div class="mb-6">
	<h4 class="text-xl font-semibold text-black dark:text-white">{title}</h4>
	<p class="font-medium text-black dark:text-white">{company}</p>
	<p class="text-sm text-black/80 dark:text-white/80">
		{period ?? `${start} - ${end}`}
	</p>
	<p class="mt-1 text-black dark:text-white">{description}</p>
	{#if details.length > 0}
		<ul class="mt-1.5 list-disc space-y-0.5 pl-5 text-sm text-black/90 dark:text-white/90">
			{#each details as detail (detail)}
				<li>{detail}</li>
			{/each}
		</ul>
	{/if}
</div>
