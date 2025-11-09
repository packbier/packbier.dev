<!-- Black and White Icon will switch colors based on the theme,  -->
<script lang="ts">
	import { theme } from '$lib/theme.svelte';

	export let svgContent: string; // e.g. data:image/svg+xml,%3csvg%20...
	export let altText: string;
	export let linkUrl: string;

	// Decode from "data:image/svg+xml,..." to "<svg ...>"
	$: decodedSvg = decodeURIComponent(svgContent.replace(/^data:image\/svg\+xml,/, ''));
</script>

<a
	href={linkUrl}
	target="_blank"
	rel="noopener noreferrer"
	aria-label={altText}
	class="switchcolor duration-300"
	class:black={theme.get === 'light'}
	class:white={theme.get === 'dark'}
>
	{@html decodedSvg}
</a>

<style>
	.black {
		filter: invert(0);
	}

	.white {
		filter: invert(1);
	}

	.switchcolor {
		transition-property: filter;
		transition-timing-function: var(
			--tw-ease,
			var(--default-transition-timing-function) /* cubic-bezier(0.4, 0, 0.2, 1) */
		);
		transition-duration: var(--tw-duration, var(--default-transition-duration) /* 150ms */);
	}

	.black:hover,
	.white:hover {
		scale: 1.05;
	}
</style>
