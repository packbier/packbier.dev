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
	import Project from '$lib/components/Project.svelte';
	import ProjectListEntry from '$lib/components/ProjectListEntry.svelte';
	import ProjectList from '$lib/components/ProjectList.svelte';

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

	let black = $derived(theme.get === 'dark');
	let white = $derived(theme.get === 'light');

	let year = new Date().getFullYear();
</script>

<main
	id="page"
	class="max-w switch transition-text flex min-h-screen flex-col text-black dark:text-white {black
		? 'bg-black'
		: 'bg-white'}"
>
	<section id="header" class="mx-8 my-8 flex flex-col md:mx-12 md:flex-row">
		<section id="hero" class="w-full md:w-[20%]">
			<h1 class="transition-text text-3xl font-bold text-black dark:text-white">{t('title')}</h1>

			<Typewriter
				strings={t('subtitle')}
				class="text-2xl font-semibold text-black dark:text-white"
			/>

			<div class="flex flex-row gap-5">
				<SvgIcon
					svgContent={linkedin}
					altText="LinkedIn Icon"
					linkUrl="https://www.linkedin.com/in/martin-packbier-4656bb239/"
				/>

				<SvgIcon svgContent={github} altText="GitHub Icon" linkUrl="https://github.com/packbier" />
			</div>
		</section>

		<div class="mt-4 flex flex-col items-start gap-5 md:mt-0 md:flex-row md:items-center md:p-6">
			<LanguageSelector />
			<ThemeSwitcher />
		</div>
	</section>

	<section id="about" class="mx-8 mb-8 w-[50%] md:mx-12">
		<h3 class="text-xl font-semibold text-black dark:text-white">{t('about_me')}</h3>
		<p class="text-black dark:text-white">{t('about_me_content')}</p>
	</section>

	<section id="experience" class="mx-8 mb-8 w-[50%] md:mx-12">
		<h3 class="text-xl font-semibold text-black dark:text-white">{t('experience')}</h3>

		<Expierence
			company={t('exp_fh_aachen')}
			start="09/2023"
			end="01/2025"
			description={t('exp_fh_aachen_desc')}
		/>
	</section>

	<section id="education" class="mx-8 mb-8 w-[50%] md:mx-12">
		<h3 class="text-xl font-semibold text-black dark:text-white">{t('education')}</h3>

		<Education
			name={t('edu_fh_aachen')}
			start="09/2022"
			end="02/2026"
			description={t('edu_fh_aachen_desc')}
		/>

		<Education
			name={t('edu_taipei')}
			start="02/2025"
			end="07/2025"
			description={t('edu_taipei_desc')}
		/>

		<Education name={t('edu_kae')} start="09/2014" end="06/2022" description={t('edu_kae_desc')} />
	</section>

	<section id="projects" class="mx-8 mb-8 w-[50%] md:mx-12">
		<h3 class="text-xl font-semibold text-black dark:text-white">{t('projects')}</h3>

		<div>
			<h4 class="text-lg font-semibold text-black dark:text-white">
				{t('proj_ml_doc_title')}
			</h4>

			<ol class="flex flex-col gap-0.5">
				<li>
					{@html t('proj_ml_doc_desc_1')}
				</li>

				<li>
					{t('proj_ml_doc_desc_2')}
				</li>

				<li><b>{t('my_tasks')}</b></li>

				<li>
					{t('proj_ml_doc_task_1')}
				</li>

				<li>
					{t('proj_ml_doc_task_2')}
				</li>

				<li>
					{t('proj_ml_doc_task_3')}
				</li>

				<li>
					<b>{t('goal_achievement')}</b>
					{t('proj_ml_doc_goal')}
				</li>
			</ol>
		</div>
	</section>

	<section id="skills" class="mx-8 mb-8 w-[50%] md:mx-12">
		<h3 class="text-xl font-semibold text-black dark:text-white">{t('skills')}</h3>
		<ul class="flex list-disc flex-col pl-5 text-black dark:text-white">
			<li>C++</li>
			<li>TypeScript</li>
			<li>Svelte</li>
			<li>Java</li>
			<li>PHP</li>
			<li>SQL</li>
			<li>SysML</li>
		</ul>
	</section>

	<section id="contact" class="mx-8 mb-8 w-[50%] md:mx-12">
		<h3 class="text-xl font-semibold text-black dark:text-white">{t('contact')}</h3>
		<p class="text-black dark:text-white">{t('email_label')} packbier.martin@gmail.com</p>
	</section>

	<section id="footer" class="mx-8 mb-8 w-[50%] md:mx-12">
		<div class="flex flex-row items-center gap-20">
			<p class="text-black dark:text-white">
				&copy; {year} Martin Packbier. {t('footer_rights')}
			</p>
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
