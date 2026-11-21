<script lang="ts">
	export interface EducationSubEntry {
		name: string;
		start: string;
		end: string;
		description: string;
	}

	let {
		name,
		start,
		end,
		description,
		grade,
		thesisLabel,
		thesis,
		subEntries = []
	}: {
		name: string;
		start: string;
		end: string;
		description: string;
		grade?: string;
		thesisLabel?: string;
		thesis?: string;
		subEntries?: EducationSubEntry[];
	} = $props();
</script>

<div class="mb-6">
	<h4 class="text-xl font-semibold text-black dark:text-white">{name}</h4>
	<p class="text-black dark:text-white">
		{start} - {end}
	</p>
	<p class="text-black dark:text-white">
		{description}{#if grade}{' '}<span class="italic">({grade})</span>{/if}
	</p>
	{#if thesis}
		<p class="mt-1 text-black dark:text-white">
			{#if thesisLabel}<span class="font-semibold">{thesisLabel}</span>{' '}{/if}{thesis}
		</p>
	{/if}
	{#if subEntries.length > 0}
		<div class="mt-3 ml-2 space-y-2 border-l-2 border-black/20 pl-4 dark:border-white/20">
			{#each subEntries as sub (sub.name + sub.start)}
				<div>
					<h5 class="text-base font-semibold text-black dark:text-white">{sub.name}</h5>
					<p class="text-sm text-black/80 dark:text-white/80">{sub.start} - {sub.end}</p>
					<p class="text-sm text-black dark:text-white">{sub.description}</p>
				</div>
			{/each}
		</div>
	{/if}
</div>
