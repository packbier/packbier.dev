<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import AccordionRow from '$lib/components/AccordionRow.svelte';
	import EducationPanel from '$lib/components/EducationPanel.svelte';
	import IntroGeometry from '$lib/components/IntroGeometry.svelte';
	import SectionRail from '$lib/components/SectionRail.svelte';
	import { t } from '$lib/language.svelte';
</script>

<svelte:head>
	<title>Martin Packbier — packbier.dev</title>
	<meta name="description" content={t('site_meta_description')} />
</svelte:head>

<SectionRail sections={t('nav_sections')} />

<main class="lg:pl-14">
	<div class="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-12">
		<!-- 01 / INTRO -->
		<section id="intro" class="scroll-mt-20 py-14 sm:py-20 lg:py-24">
			<p class="mb-6 font-mono text-[11px] tracking-[0.06em] text-[var(--ink-muted)] uppercase">
				{t('section_intro_label')}
			</p>

			<div class="grid grid-cols-1 items-start gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-12">
				<div class="space-y-6 lg:col-span-8">
					<h1
						class="text-3xl leading-[1.12] font-semibold tracking-[-0.025em] text-[var(--ink-primary)] sm:text-4xl lg:text-[2.75rem]"
					>
						{t('intro_heading')}
					</h1>

					<p
						class="max-w-[58ch] text-[15px] leading-[1.7] text-[var(--ink-secondary)] sm:text-[16px]"
					>
						{t('intro_bio')}
					</p>

					<!-- Calm amber status pill -->
					<div class="flex flex-wrap items-center gap-2.5 pt-1">
						{#each t('intro_pills') as pill (pill)}
							<span
								class="inline-flex items-center gap-2 border border-[var(--accent-border)] bg-[var(--accent-soft-bg)] px-2.5 py-1 font-mono text-[11px] tracking-[0.05em] text-[var(--accent-ink)] uppercase"
							>
								<span aria-hidden="true" class="h-1.5 w-1.5 bg-[var(--accent)]"></span>
								<span>{pill}</span>
							</span>
						{/each}
					</div>

					<!-- Subtle Blog & Contact CTAs -->
					<div class="flex flex-wrap items-center gap-4 pt-2">
						<a
							href="https://blog.packbier.dev"
							target="_blank"
							rel="noopener noreferrer"
							aria-label={t('blog_aria')}
							class="inline-flex items-center gap-2 border border-[var(--rule-strong)] bg-[var(--bg-surface)]/50 px-4 py-2 font-mono text-[12px] tracking-[0.05em] text-[var(--ink-primary)] uppercase transition-colors duration-150 hover:border-[var(--accent-border)] hover:bg-[var(--accent-soft-bg)] hover:text-[var(--accent-ink)]"
						>
							<span>{t('intro_blog_cta')}</span>
							<span aria-hidden="true">&#8599;</span>
						</a>

						<a
							href="#skills-contact"
							class="inline-flex items-center gap-1.5 px-1 py-2 font-mono text-[12px] tracking-[0.05em] text-[var(--ink-muted)] uppercase transition-colors duration-150 hover:text-[var(--accent-ink)]"
						>
							<span>{t('intro_contact_cta')}</span>
							<span aria-hidden="true">&darr;</span>
						</a>
					</div>
				</div>

				<div class="lg:col-span-3 lg:col-start-10">
					<IntroGeometry />
				</div>
			</div>
		</section>

		<!-- 02 / EXPERIENCE -->
		<section
			id="experience"
			use:reveal
			class="scroll-mt-20 border-t border-[var(--rule)] py-12 sm:py-16"
		>
			<div class="grid grid-cols-1 gap-x-4 gap-y-6 md:gap-x-6 lg:grid-cols-12">
				<div class="space-y-2 lg:col-span-3">
					<h2
						class="font-mono text-[12px] font-medium tracking-[0.06em] text-[var(--ink-primary)] uppercase"
					>
						{t('section_experience_label')}
					</h2>
					<p class="font-mono text-[10px] tracking-[0.05em] text-[var(--ink-muted)] uppercase">
						{t('expand_hint')}
					</p>
				</div>

				<div class="border-t border-[var(--rule)] lg:col-span-9">
					{#each t('experience_items') as item (item.id)}
						<AccordionRow
							id={item.id}
							title={item.role}
							organization={item.organization}
							location={item.location}
							period={item.period}
							badge={item.badge}
						>
							<div class="space-y-3.5">
								<p class="text-[15px] leading-[1.65] text-[var(--ink-primary)]">
									{item.summary}
								</p>

								{#if item.bullets.length > 0}
									<ul class="space-y-2">
										{#each item.bullets as bullet (bullet)}
											<li
												class="flex items-start gap-2.5 text-[15px] leading-[1.6] text-[var(--ink-secondary)]"
											>
												<span
													aria-hidden="true"
													class="mt-[0.62em] h-1 w-1 shrink-0 bg-[var(--accent)]"
												></span>
												<span>{bullet}</span>
											</li>
										{/each}
									</ul>
								{/if}

								{#if item.tags.length > 0}
									<div class="flex flex-wrap gap-1.5 pt-1">
										{#each item.tags as tag (tag)}
											<span
												class="border border-[var(--rule)] bg-[var(--bg-paper)] px-2 py-0.5 font-mono text-[11px] tracking-[0.04em] text-[var(--ink-secondary)]"
											>
												{tag}
											</span>
										{/each}
									</div>
								{/if}
							</div>
						</AccordionRow>
					{/each}
				</div>
			</div>
		</section>

		<!-- 03 / PROJECTS & RESEARCH -->
		<section
			id="projects"
			use:reveal
			class="scroll-mt-20 border-t border-[var(--rule)] py-12 sm:py-16"
		>
			<div class="grid grid-cols-1 gap-x-4 gap-y-6 md:gap-x-6 lg:grid-cols-12">
				<div class="space-y-2 lg:col-span-3">
					<h2
						class="font-mono text-[12px] font-medium tracking-[0.06em] text-[var(--ink-primary)] uppercase"
					>
						{t('section_projects_label')}
					</h2>
					<p class="font-mono text-[10px] tracking-[0.05em] text-[var(--ink-muted)] uppercase">
						{t('expand_hint')}
					</p>
				</div>

				<div class="border-t border-[var(--rule)] lg:col-span-9">
					{#each t('project_items') as item (item.id)}
						<AccordionRow
							id={item.id}
							title={item.title}
							organization={item.context}
							location={item.location}
							period={item.period}
							badge={item.badge}
						>
							<div class="space-y-3.5">
								{#if item.metaLabel && item.metaValue}
									<div
										class="flex flex-wrap items-baseline gap-x-2.5 gap-y-1 border-b border-[var(--rule)] pb-2.5"
									>
										<span
											class="font-mono text-[11px] tracking-[0.05em] text-[var(--ink-muted)] uppercase"
										>
											{item.metaLabel}:
										</span>
										<span class="text-[14px] font-medium text-[var(--ink-primary)]">
											{item.metaValue}
										</span>
									</div>
								{/if}

								<p class="text-[15px] leading-[1.65] text-[var(--ink-primary)]">
									{item.summary}
								</p>

								{#if item.bullets.length > 0}
									<ul class="space-y-2">
										{#each item.bullets as bullet (bullet)}
											<li
												class="flex items-start gap-2.5 text-[15px] leading-[1.6] text-[var(--ink-secondary)]"
											>
												<span
													aria-hidden="true"
													class="mt-[0.62em] h-1 w-1 shrink-0 bg-[var(--accent)]"
												></span>
												<span>{bullet}</span>
											</li>
										{/each}
									</ul>
								{/if}

								{#if item.tags.length > 0}
									<div class="flex flex-wrap gap-1.5 pt-1">
										{#each item.tags as tag (tag)}
											<span
												class="border border-[var(--rule)] bg-[var(--bg-paper)] px-2 py-0.5 font-mono text-[11px] tracking-[0.04em] text-[var(--ink-secondary)]"
											>
												{tag}
											</span>
										{/each}
									</div>
								{/if}
							</div>
						</AccordionRow>
					{/each}
				</div>
			</div>
		</section>

		<!-- 04 / EDUCATION -->
		<section
			id="education"
			use:reveal
			class="scroll-mt-20 border-t border-[var(--rule)] py-12 sm:py-16"
		>
			<div class="grid grid-cols-1 gap-x-4 gap-y-6 md:gap-x-6 lg:grid-cols-12">
				<div class="space-y-2 lg:col-span-3">
					<h2
						class="font-mono text-[12px] font-medium tracking-[0.06em] text-[var(--ink-primary)] uppercase"
					>
						{t('section_education_label')}
					</h2>
					<p class="font-mono text-[10px] tracking-[0.05em] text-[var(--ink-muted)] uppercase">
						{t('expand_hint')}
					</p>
				</div>

				<div class="border-t border-[var(--rule)] lg:col-span-9">
					{#each t('education_items') as item (item.id)}
						<AccordionRow
							id={item.id}
							title={item.degree}
							organization={item.institution}
							location={item.location}
							period={item.period}
							secondaryMeta={item.grade}
							badge={item.exchangeBadge}
						>
							<EducationPanel {item} />
						</AccordionRow>
					{/each}
				</div>
			</div>
		</section>

		<!-- 05 / SKILLS, LANGUAGES & CONTACT -->
		<section
			id="skills-contact"
			use:reveal
			class="scroll-mt-20 border-t border-[var(--rule)] py-12 sm:py-16"
		>
			<div class="grid grid-cols-1 gap-x-4 gap-y-6 md:gap-x-6 lg:grid-cols-12">
				<div class="lg:col-span-3">
					<h2
						class="font-mono text-[12px] font-medium tracking-[0.06em] text-[var(--ink-primary)] uppercase"
					>
						{t('section_skills_contact_label')}
					</h2>
				</div>

				<div class="space-y-10 lg:col-span-9">
					<!-- Structured monospace skills index -->
					<div class="space-y-3">
						<h3 class="font-mono text-[11px] tracking-[0.06em] text-[var(--ink-muted)] uppercase">
							{t('skills_heading')}
						</h3>

						<dl class="border-t border-[var(--rule)]">
							{#each t('skill_groups') as group (group.category)}
								<div
									class="grid grid-cols-1 gap-y-1.5 border-b border-[var(--rule)] py-3.5 md:grid-cols-8 md:items-baseline md:gap-x-6 lg:grid-cols-9"
								>
									<dt
										class="font-mono text-[11px] tracking-[0.05em] text-[var(--ink-muted)] uppercase md:col-span-3 lg:col-span-3"
									>
										{group.category}
									</dt>
									<dd
										class="flex flex-wrap items-baseline gap-y-1 font-mono text-[13px] leading-relaxed text-[var(--ink-primary)] md:col-span-5 lg:col-span-6"
									>
										{#each group.items as entry, idx (entry)}
											<span>{entry}</span>
											{#if idx < group.items.length - 1}
												<span aria-hidden="true" class="mx-2 text-[var(--rule-strong)]">/</span>
											{/if}
										{/each}
									</dd>
								</div>
							{/each}
						</dl>
					</div>

					<!-- Direct contact block -->
					<div class="space-y-3">
						<h3 class="font-mono text-[11px] tracking-[0.06em] text-[var(--ink-muted)] uppercase">
							{t('contact_heading')}
						</h3>

						<div class="border-t border-[var(--rule)]">
							<a
								href="mailto:packbier.martin@gmail.com"
								class="group relative grid grid-cols-4 items-center gap-x-4 gap-y-1 border-b border-[var(--rule)] py-3.5 md:grid-cols-8 md:gap-x-6 lg:grid-cols-9"
							>
								<span
									aria-hidden="true"
									class="pointer-events-none absolute -inset-x-2 inset-y-0 -z-10 transition-colors duration-150 group-hover:bg-[var(--bg-row-hover)] sm:-inset-x-3"
								></span>
								<span
									aria-hidden="true"
									class="pointer-events-none absolute top-0 bottom-0 -left-2 w-0.5 bg-[var(--accent)] opacity-0 transition-opacity duration-150 group-hover:opacity-100 sm:-left-3"
								></span>

								<span
									class="col-span-3 font-mono text-[11px] tracking-[0.05em] text-[var(--ink-muted)] uppercase md:col-span-3 lg:col-span-3"
								>
									{t('contact_email_label')}
								</span>
								<span
									class="col-span-4 font-mono text-[13px] text-[var(--ink-primary)] transition-colors group-hover:text-[var(--accent-ink)] sm:text-[14px] md:col-span-4 lg:col-span-5"
								>
									packbier.martin@gmail.com
								</span>
								<span
									aria-hidden="true"
									class="col-span-1 col-start-4 row-start-1 justify-self-end font-mono text-[12px] text-[var(--ink-muted)] transition-colors group-hover:text-[var(--accent-ink)] md:col-start-8 md:row-start-auto lg:col-start-9"
								>
									&#8599;
								</span>
							</a>

							<a
								href="https://linkedin.com/in/packbier"
								target="_blank"
								rel="noopener noreferrer"
								class="group relative grid grid-cols-4 items-center gap-x-4 gap-y-1 border-b border-[var(--rule)] py-3.5 md:grid-cols-8 md:gap-x-6 lg:grid-cols-9"
							>
								<span
									aria-hidden="true"
									class="pointer-events-none absolute -inset-x-2 inset-y-0 -z-10 transition-colors duration-150 group-hover:bg-[var(--bg-row-hover)] sm:-inset-x-3"
								></span>
								<span
									aria-hidden="true"
									class="pointer-events-none absolute top-0 bottom-0 -left-2 w-0.5 bg-[var(--accent)] opacity-0 transition-opacity duration-150 group-hover:opacity-100 sm:-left-3"
								></span>

								<span
									class="col-span-3 font-mono text-[11px] tracking-[0.05em] text-[var(--ink-muted)] uppercase md:col-span-3 lg:col-span-3"
								>
									{t('contact_linkedin_label')}
								</span>
								<span
									class="col-span-4 font-mono text-[13px] text-[var(--ink-primary)] transition-colors group-hover:text-[var(--accent-ink)] sm:text-[14px] md:col-span-4 lg:col-span-5"
								>
									linkedin.com/in/packbier
								</span>
								<span
									aria-hidden="true"
									class="col-span-1 col-start-4 row-start-1 justify-self-end font-mono text-[12px] text-[var(--ink-muted)] transition-colors group-hover:text-[var(--accent-ink)] md:col-start-8 md:row-start-auto lg:col-start-9"
								>
									&#8599;
								</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</main>
