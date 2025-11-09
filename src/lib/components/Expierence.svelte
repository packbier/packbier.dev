<script lang="ts">
	export let company: string;
	export let description: string;
	export let start: string;
	export let end: string;
</script>

<div class="mb-4">
	<h3 class="text-xl font-semibold text-black dark:text-white">{company}</h3>
	<p class="text-black dark:text-white">
		{start} - {end}
	</p>
	<p class="text-black dark:text-white">{description}</p>
</div>
