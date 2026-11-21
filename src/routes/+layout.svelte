<script lang="ts">
	import '../app.css';

	import favicon from '$lib/assets/favicon.svg';
	import VantaBackground from '$lib/components/VantaBackground.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta
		name="description"
		content="Martin Packbier - Computer Science Student & Software Developer"
	/>
	<meta name="author" content="Martin Packbier" />
	<meta
		name="keywords"
		content="Martin Packbier, Personal Website, Computer Science, Software Developer"
	/>
	<meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff" />
	<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000000" />
	<title>Martin Packbier</title>
</svelte:head>

<VantaBackground />

{@render children()}
