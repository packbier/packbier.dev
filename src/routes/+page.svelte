<script lang="ts">
	import Education from '$lib/components/Education.svelte';
	import Expierence from '$lib/components/Expierence.svelte';
	import LanguageSelector from '$lib/components/LanguageSelector.svelte';
	import { onMount } from 'svelte';
	import github from '$lib/assets/github.svg';
	import linkedin from '$lib/assets/linkedin.svg';
	import SvgIcon from '$lib/components/BlackWhiteIcon.svelte';
	import Typewriter from '$lib/components/Typewriter.svelte';
	import ThemeSwitcher from '$lib/components/ThemeSelector.svelte';
	import { theme } from '$lib/theme.svelte';
	// @ts-ignore
	import GLOBE from 'vanta/dist/vanta.globe.min';
	import { t } from '$lib/language.svelte';

	let vantaEffect: any;

	let blackMode = {
		color: 0x46ff,
		color2: 0xba8cde,
		backgroundColor: 0x000000
	};

	let whiteMode = {
		color: 0x46ff,
		color2: 0xba8cde,
		backgroundColor: 0xffffff
	};

	onMount(() => {
		let options = {
			el: '#page',
			mouseControls: true,
			touchControls: true,
			gyroControls: true,
			minHeight: 1000.0,
			minWidth: 1000.0,
			scale: 1.0,
			scaleMobile: 1.0,
			size: 0.5
		};

		theme.get === 'dark'
			? (vantaEffect = GLOBE({
					...options,
					...blackMode
				}))
			: (vantaEffect = GLOBE({
					...options,
					...whiteMode
				}));
	});

	$effect(() => {
		theme.get === 'dark' ? vantaEffect.setOptions(blackMode) : vantaEffect.setOptions(whiteMode);
	});

	let year = new Date().getFullYear();
</script>

<main id="page" class="max-w .switch flex min-h-screen flex-col duration-300">
	<section id="hero" class="m-12 w-[50%]">
		<h1 class="text-3xl font-bold text-black dark:text-white">{t('title')}</h1>
		<Typewriter strings={t('subtitle')} class="text-2xl font-semibold text-black dark:text-white" />

		<div class="flex flex-row gap-5">
			<SvgIcon
				svgContent={linkedin}
				altText="LinkedIn Icon"
				linkUrl="https://www.linkedin.com/in/martin-packbier-4656bb239/"
			/>

			<SvgIcon svgContent={github} altText="GitHub Icon" linkUrl="https://github.com/packbier" />
		</div>
	</section>

	<section id="about" class="m-12 mt-0 w-[50%]">
		<h3 class="text-xl font-semibold text-black dark:text-white">{t('about_me')}</h3>
		<p class="text-black dark:text-white">{t('about_me_content')}</p>
	</section>

	<section id="experience" class="m-12 mt-0 w-[50%]">
		<h3 class="text-xl font-semibold text-black dark:text-white">{t('experience')}</h3>

		<Expierence
			company="University of Applied Sciences FH Aachen"
			start="09/2023"
			end="01/2025"
			description="Assistant Student for the courses 'Databases and web technologies' and 'Introduction to programming'"
		/>
	</section>

	<section id="education" class="m-12 mt-0 w-[50%]">
		<h3 class="text-xl font-semibold text-black dark:text-white">Education</h3>

		<Education
			name="University of Applied Sciences FH Aachen, Germany"
			start="09/2022"
			end="02/2026"
			description="B.Sc. in Computer Science"
		/>

		<Education
			name="National Taipei University of Technology (Taipei Tech), Taiwan"
			start="02/2025"
			end="07/2025"
			description="Exchange semester"
		/>

		<Education
			name="Königliches Athenäum Eupen, Belgium"
			start="09/2014"
			end="06/2022"
			description="Abitur with focus on Computer Science and Design"
		/>
	</section>

	<section id="skills" class="m-12 mt-0 w-[50%]">
		<h3 class="text-xl font-semibold text-black dark:text-white">Skills</h3>
		<ul class="list-disc pl-5 text-black dark:text-white">
			<li>TypeScript</li>
			<li>Svelte</li>
			<li>Java</li>
			<li>PHP</li>
			<li>SQL</li>
			<li>UML & SysML</li>
		</ul>
	</section>

	<section id="contact" class="m-12 mt-0 w-[50%]">
		<h3 class="text-xl font-semibold text-black dark:text-white">Contact</h3>
		<p class="text-black dark:text-white">Email: packbier.martin@gmail.com</p>
	</section>

	<section id="footer" class="m-12 mt-0 w-[50%]">
		<div class="flex flex-row items-center gap-20">
			<p class="text-black dark:text-white">&copy; {year} Martin Packbier. All rights reserved.</p>
			<LanguageSelector />
			<ThemeSwitcher />
		</div>
	</section>
</main>

<style>
	.switch {
		transition-property: color;
		transition-duration: var(--tw-duration, var(--default-transition-duration) /* 150ms */);
		transition-timing-function: var(
			--tw-ease,
			var(--default-transition-timing-function) /* cubic-bezier(0.4, 0, 0.2, 1) */
		);
	}
</style>
