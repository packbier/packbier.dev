<script lang="ts">
	import '../app.css';

	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="description" content="Martin Packbier - Software Engineer Portfolio" />
	<meta name="author" content="Martin Packbier" />
	<meta name="keywords" content="Martin Packbier, Software Engineer, Portfolio, Web Developer" />
	<meta name="theme-color" content="#ffffff" />
	<title>Martin Packbier</title>

	<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.birds.min.js"></script>
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

{@render children()}
