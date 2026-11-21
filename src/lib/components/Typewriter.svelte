<script lang="ts">
	// @ts-ignore
	import TypeIt from 'typeit';

	let { class: className = '', strings }: { class?: string; strings: string | string[] } = $props();

	let el: HTMLSpanElement | undefined = $state();
	const id = 'typewriter-' + Math.random().toString(36).slice(2, 11);

	$effect(() => {
		const targetStrings = Array.isArray(strings) ? [...strings] : strings;
		if (!el) return;

		el.innerHTML = '';
		const instance: any = new TypeIt(`#${id}`, {
			strings: targetStrings,
			breakLines: false,
			speed: 100,
			waitUntilVisible: true,
			cursor: true,
			loop: true
		});

		return () => {
			instance?.destroy?.(true);
			if (el) el.innerHTML = '';
		};
	});
</script>

<span bind:this={el} class={className} {id}></span>
