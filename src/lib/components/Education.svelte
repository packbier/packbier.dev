<script lang="ts">
	export let name: string;
	export let start: string;
	export let end: string;
	export let description: string;
</script>

<div>
	<h3 class="text-xl font-semibold text-black dark:text-white">{name}</h3>
	<p class="text-black dark:text-white">
		{start} - {end}
	</p>
	<p class="text-black dark:text-white">{description}</p>
</div>
