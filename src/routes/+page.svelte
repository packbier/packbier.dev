<script lang="ts">
	import Education from '$lib/components/Education.svelte';
	import Expierence from '$lib/components/Expierence.svelte';
	import LanguageSelector from '$lib/components/LanguageSelector.svelte';
	import github from '$lib/assets/github.svg';
	import linkedin from '$lib/assets/linkedin.svg';
	import SvgIcon from '$lib/components/BlackWhiteIcon.svelte';
	import Typewriter from '$lib/components/Typewriter.svelte';
	import ThemeSwitcher from '$lib/components/ThemeSelector.svelte';
	import { t } from '$lib/language.svelte';

	type SkillCategoryKey =
		'skill_cat_language' | 'skill_cat_framework' | 'skill_cat_database' | 'skill_cat_modeling';

	let year = new Date().getFullYear();

	const skills: { name: string; categoryKey: SkillCategoryKey }[] = [
		{ name: 'C++', categoryKey: 'skill_cat_language' },
		{ name: 'TypeScript', categoryKey: 'skill_cat_language' },
		{ name: 'Svelte', categoryKey: 'skill_cat_framework' },
		{ name: 'Java', categoryKey: 'skill_cat_language' },
		{ name: 'PHP', categoryKey: 'skill_cat_language' },
		{ name: 'Laravel', categoryKey: 'skill_cat_framework' },
		{ name: 'SQL', categoryKey: 'skill_cat_database' },
		{ name: 'SysML', categoryKey: 'skill_cat_modeling' }
	];
</script>

<main
	id="page"
	class="switch transition-text flex min-h-screen flex-col text-black dark:text-white"
>
	<section id="header" class="mx-auto my-8 flex w-[90%] flex-col md:mx-12 md:w-auto md:flex-row">
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
					linkUrl="https://www.linkedin.com/in/packbier/"
				/>

				<SvgIcon svgContent={github} altText="GitHub Icon" linkUrl="https://github.com/packbier" />
			</div>
		</section>

		<div class="mt-4 flex flex-col items-start gap-5 md:mt-0 md:flex-row md:items-center md:p-6">
			<LanguageSelector />
			<ThemeSwitcher />
			<a
				href="https://blog.packbier.dev"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Visit blog at blog.packbier.dev"
				class="inline-flex items-center gap-1.5 rounded-full border border-black/20 bg-black/5 px-5 py-2.5 text-sm leading-5 font-medium text-black backdrop-blur-sm transition-all duration-300 hover:border-[#0046ff]/50 hover:bg-black/10 focus-visible:ring-2 focus-visible:ring-[#0046ff] focus-visible:ring-offset-2 focus-visible:outline-none dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:border-[#ba8cde]/60 dark:hover:bg-white/15 dark:focus-visible:ring-offset-black"
			>
				{t('blog')}
				<span aria-hidden="true">&#8599;</span>
			</a>
		</div>
	</section>

	<section id="about" class="mx-auto mb-8 w-[90%] md:mx-12 md:w-[50%]">
		<h3 class="text-xl font-semibold text-black dark:text-white">{t('about_me')}</h3>
		<p class="text-black dark:text-white">{t('about_me_content')}</p>
	</section>

	<section id="experience" class="mx-auto mb-8 w-[90%] md:mx-12 md:w-[50%]">
		<h3 class="text-xl font-semibold text-black dark:text-white">{t('experience')}</h3>

		<Expierence
			title={t('exp_fh_aachen_scora_role')}
			company={t('exp_fh_aachen')}
			start="02/2026"
			end="08/2026"
			description={t('exp_fh_aachen_scora_desc')}
		/>

		<Expierence
			title={t('exp_fh_aachen_tutor_role')}
			company={t('exp_fh_aachen')}
			period="10/2023 - 01/2025 · 03/2026 - 06/2026"
			description={t('exp_fh_aachen_tutor_desc')}
			details={t('exp_fh_aachen_tutor_details')}
		/>
	</section>

	<section id="education" class="mx-auto mb-8 w-[90%] md:mx-12 md:w-[50%]">
		<h3 class="text-xl font-semibold text-black dark:text-white">{t('education')}</h3>

		<Education
			name={t('edu_fh_aachen')}
			start="03/2026"
			end="07/2028"
			description={t('edu_fh_aachen_msc_desc')}
			subEntries={[
				{
					name: t('edu_taipei'),
					start: '09/2026',
					end: '01/2027',
					description: t('edu_taipei_desc')
				}
			]}
		/>

		<Education
			name={t('edu_fh_aachen')}
			start="09/2022"
			end="02/2026"
			description={t('edu_fh_aachen_bsc_desc')}
			grade={t('edu_fh_aachen_bsc_grade')}
			thesisLabel={t('edu_fh_aachen_bsc_thesis_label')}
			thesis={t('edu_fh_aachen_bsc_thesis')}
			subEntries={[
				{
					name: t('edu_taipei'),
					start: '02/2025',
					end: '07/2025',
					description: t('edu_taipei_desc')
				}
			]}
		/>

		<Education name={t('edu_kae')} start="09/2014" end="06/2022" description={t('edu_kae_desc')} />
	</section>

	<section id="projects" class="mx-auto mb-8 w-[90%] md:mx-12 md:w-[50%]">
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

	<section id="skills" class="mx-auto mb-8 w-[90%] md:mx-12 md:w-[50%]">
		<h3 class="text-xl font-semibold text-black dark:text-white">{t('skills')}</h3>
		<div class="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
			{#each skills as skill (skill.name)}
				<div
					class="rounded-xl border border-black/15 bg-black/5 px-4 py-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0046ff]/50 hover:bg-black/10 hover:shadow-md dark:border-white/15 dark:bg-white/10 dark:hover:border-[#ba8cde]/60 dark:hover:bg-white/15"
				>
					<div class="font-semibold text-black dark:text-white">{skill.name}</div>
					<div class="text-xs text-black/60 dark:text-white/60">{t(skill.categoryKey)}</div>
				</div>
			{/each}
		</div>
	</section>

	<section id="contact" class="mx-auto mb-8 w-[90%] md:mx-12 md:w-[50%]">
		<h3 class="text-xl font-semibold text-black dark:text-white">{t('contact')}</h3>
		<p class="text-black dark:text-white">
			{t('email_label')}
			<a
				href="mailto:packbier.martin@gmail.com"
				class="text-blue-600 hover:underline dark:text-blue-400"
			>
				packbier.martin@gmail.com
			</a>
		</p>
	</section>

	<section id="footer" class="mx-auto mb-8 w-[90%] md:mx-12 md:w-[50%]">
		<div class="flex flex-row items-center gap-20">
			<p class="text-black dark:text-white">
				&copy; {year} Martin Packbier |
				<a
					class="text-blue-600 hover:underline dark:text-blue-400"
					href="https://blog.packbier.dev"
					target="_blank"
					rel="noopener noreferrer">{t('blog')}</a
				>
				|
				<a class="text-blue-600 hover:underline dark:text-blue-400" href="/credits/">Credits</a>
				|
				<a class="text-blue-600 hover:underline dark:text-blue-400" href="/privacy/"
					>{t('privacy_policy')}</a
				>
				| {t('footer_rights')}
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
