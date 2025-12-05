<script lang="ts">
	export let title: string;
</script>

<section>
	<h2 class="mb-6 text-2xl font-bold text-black dark:text-white">{title}</h2>
	<slot />
</section>
