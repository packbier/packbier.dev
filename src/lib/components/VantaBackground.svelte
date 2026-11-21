<script lang="ts">
	import { onMount } from 'svelte';
	import { theme } from '$lib/theme.svelte';

	type VantaEffect = {
		setOptions: (opts: Record<string, unknown>) => void;
		destroy: () => void;
	};

	let containerEl: HTMLDivElement | undefined = $state();
	let vantaEffect: VantaEffect | undefined = $state();

	const blackMode = {
		color: 0x46ff,
		color2: 0xba8cde,
		backgroundColor: 0x000000
	};

	const whiteMode = {
		color: 0x46ff,
		color2: 0xba8cde,
		backgroundColor: 0xffffff
	};

	onMount(() => {
		let cancelled = false;

		(async () => {
			try {
				const [THREE, vantaMod] = await Promise.all([
					import('three'),
					// @ts-ignore
					import('vanta/dist/vanta.globe.min')
				]);

				if (cancelled || !containerEl) return;

				// Vanta's globe shader still references legacy THREE.VertexColors (removed in three r150+)
				const VantaTHREE = { ...THREE, VertexColors: true };
				(window as unknown as Record<string, unknown>).THREE = VantaTHREE;

				const globeFactory =
					typeof vantaMod.default === 'function'
						? vantaMod.default
						: typeof vantaMod.default?.default === 'function'
							? vantaMod.default.default
							: vantaMod;

				if (typeof globeFactory !== 'function') return;

				vantaEffect = globeFactory({
					el: containerEl,
					THREE: VantaTHREE,
					mouseControls: true,
					touchControls: true,
					gyroControls: true,
					minHeight: 200.0,
					minWidth: 200.0,
					scale: 1.0,
					scaleMobile: 1.0,
					size: 0.5,
					...(theme.get === 'dark' ? blackMode : whiteMode)
				});
			} catch (err) {
				console.warn('[VantaBackground] Failed to initialize WebGL globe:', err);
			}
		})();

		return () => {
			cancelled = true;
			vantaEffect?.destroy();
			vantaEffect = undefined;
		};
	});

	$effect(() => {
		const mode = theme.get === 'dark' ? blackMode : whiteMode;
		vantaEffect?.setOptions(mode);
	});
</script>

<div bind:this={containerEl} id="vanta-bg" class="fixed inset-0 -z-10 bg-white dark:bg-black"></div>
