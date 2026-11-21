<div
	aria-hidden="true"
	class="pointer-events-none fixed inset-0 z-50"
	style="opacity: var(--grain-opacity); mix-blend-mode: var(--grain-blend);"
>
	<svg class="block h-full w-full" xmlns="http://www.w3.org/2000/svg">
		<filter id="paper-grain">
			<feTurbulence
				type="fractalNoise"
				baseFrequency="0.72"
				numOctaves="4"
				seed="7"
				stitchTiles="stitch"
			/>
			<feColorMatrix type="saturate" values="0" />
			<feComponentTransfer>
				<feFuncR type="linear" slope="2.4" intercept="-0.7" />
				<feFuncG type="linear" slope="2.4" intercept="-0.7" />
				<feFuncB type="linear" slope="2.4" intercept="-0.7" />
			</feComponentTransfer>
		</filter>
		<rect width="100%" height="100%" filter="url(#paper-grain)" />
	</svg>
</div>
