<script lang="ts">
	let className: string = '';

	export { className as class };
	export let strings: string | string[];

	import { onMount } from 'svelte';

	// @ts-ignore
	import TypeIt from 'typeit';

	function generateId() {
		return 'typewriter-' + Math.random().toString(36).substr(2, 9);
	}

	$: id = generateId();

	onMount(() => {
		const instance: any = new TypeIt(`#${id}`, {
			strings,
			breakLines: false,
			speed: 100,
			waitUntilVisible: true,
			cursor: true,
			loop: true
		});
	});
</script>

<span class={className} {id}></span>
