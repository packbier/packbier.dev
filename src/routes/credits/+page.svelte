<script lang="ts">
	import ThemeSwitcher from '$lib/components/ThemeSelector.svelte';
</script>

<svelte:head>
	<title>Credits | Martin Packbier</title>
</svelte:head>

<main class="transition-text min-h-screen p-8 font-sans text-black md:p-12 dark:text-white">
	<div class="mx-auto max-w-2xl">
		<div class="mb-12 flex flex-wrap items-center justify-between gap-4">
			<h1 class="text-4xl font-bold">Credits</h1>
			<ThemeSwitcher />
		</div>

		<div class="space-y-10">
			<section>
				<h2 class="mb-4 text-2xl font-semibold">Source Code</h2>
				<ul class="list-disc pl-5">
					<li>
						<a
							href="https://github.com/packbier/packbier.dev"
							target="_blank"
							rel="noopener noreferrer"
							class="text-blue-600 hover:underline dark:text-blue-400">GitHub Repository</a
						>
					</li>
				</ul>
			</section>

			<section>
				<h2 class="mb-4 text-2xl font-semibold">Icons</h2>
				<ul class="list-disc pl-5">
					<li>
						<a
							href="https://iconoir.com/"
							target="_blank"
							rel="noopener noreferrer"
							class="text-blue-600 hover:underline dark:text-blue-400">Iconoir</a
						>
					</li>
				</ul>
			</section>

			<section>
				<h2 class="mb-4 text-2xl font-semibold">Libraries & Frameworks</h2>
				<ul class="list-disc space-y-2 pl-5">
					<li>
						<a
							href="https://kit.svelte.dev/"
							target="_blank"
							rel="noopener noreferrer"
							class="text-blue-600 hover:underline dark:text-blue-400">SvelteKit</a
						>
					</li>
					<li>
						<a
							href="https://tailwindcss.com/"
							target="_blank"
							rel="noopener noreferrer"
							class="text-blue-600 hover:underline dark:text-blue-400">Tailwind CSS</a
						>
					</li>
					<li>
						<a
							href="https://vanta.js.org/"
							target="_blank"
							rel="noopener noreferrer"
							class="text-blue-600 hover:underline dark:text-blue-400">Vanta.js</a
						>
					</li>
				</ul>
			</section>

			<section>
				<h2 class="mb-4 text-2xl font-semibold">Hosting</h2>
				<ul class="list-disc space-y-2 pl-5">
					<li>
						<a
							href="https://pages.cloudflare.com/"
							target="_blank"
							rel="noopener noreferrer"
							class="text-blue-600 hover:underline dark:text-blue-400">Cloudflare Pages</a
						>
					</li>
					<li>
						<a
							href="https://pages.github.com/"
							target="_blank"
							rel="noopener noreferrer"
							class="text-blue-600 hover:underline dark:text-blue-400">GitHub Pages</a
						>
					</li>
				</ul>
			</section>

			<section>
				<h2 class="mb-4 text-2xl font-semibold">Fonts</h2>
				<ul class="list-disc space-y-2 pl-5">
					<li>
						<a
							href="https://fonts.google.com/specimen/Nunito+Sans"
							target="_blank"
							rel="noopener noreferrer"
							class="text-blue-600 hover:underline dark:text-blue-400">Nunito Sans</a
						>
					</li>
				</ul>
			</section>
		</div>

		<div class="mt-16">
			<a
				href="/"
				class="inline-flex items-center text-sm font-medium text-gray-600 hover:text-black hover:underline dark:text-gray-400 dark:hover:text-white"
			>
				&larr; Back to Home
			</a>
		</div>
	</div>
</main>
