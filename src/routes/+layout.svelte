<script lang="ts">
	import '@fontsource-variable/geist';
	import '@fontsource-variable/geist-mono';
	import '../app.css';

	import favicon from '$lib/assets/favicon.svg';
	import GridOverlay from '$lib/components/GridOverlay.svelte';
	import PaperGrain from '$lib/components/PaperGrain.svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import { language, t } from '$lib/language.svelte';

	let { children } = $props();

	$effect(() => {
		if (typeof document !== 'undefined') {
			document.documentElement.lang = language.get;
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} type="image/svg+xml" />
	<meta name="description" content={t('site_meta_description')} />
	<meta name="author" content="Martin Packbier" />
	<meta
		name="keywords"
		content="Martin Packbier, packbier.dev, Computer Science, Software Engineering, MBSE, SysML, FH Aachen"
	/>
	<meta name="theme-color" media="(prefers-color-scheme: light)" content="#F2F4F6" />
	<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#121418" />
	<title>Martin Packbier</title>
</svelte:head>

<PaperGrain />
<GridOverlay />

<div class="relative flex min-h-screen flex-col">
	<SiteHeader />

	<div class="flex-1">
		{@render children()}
	</div>

	<SiteFooter />
</div>
