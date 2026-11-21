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

	<script>
		(function (w, d, s, l, i) {
			w[l] = w[l] || [];
			w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
			var f = d.getElementsByTagName(s)[0],
				j = d.createElement(s),
				dl = l != 'dataLayer' ? '&l=' + l : '';
			j.async = true;
			j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
			f.parentNode.insertBefore(j, f);
		})(window, document, 'script', 'dataLayer', 'GTM-KW877W23');
	</script>
</svelte:head>

<noscript
	><iframe
		title=""
		src="https://www.googletagmanager.com/ns.html?id=GTM-KW877W23"
		height="0"
		width="0"
		style="display:none;visibility:hidden"
	></iframe></noscript
>

<VantaBackground />

{@render children()}
