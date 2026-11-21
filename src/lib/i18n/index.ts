export interface NavSection {
	id: string;
	num: string;
	label: string;
}

export interface ExperienceItem {
	id: string;
	role: string;
	organization: string;
	location: string;
	period: string;
	badge: string;
	summary: string;
	bullets: string[];
	tags: string[];
}

export interface ProjectItem {
	id: string;
	title: string;
	context: string;
	location?: string;
	period: string;
	badge: string;
	metaLabel?: string;
	metaValue?: string;
	summary: string;
	bullets: string[];
	tags: string[];
}

export interface EducationDetail {
	label: string;
	value: string;
}

export interface EducationExchange {
	mainTabLabel: string;
	tabLabel: string;
	institution: string;
	location: string;
	period: string;
	grade?: string;
	summary?: string;
	details?: EducationDetail[];
	modulesLabel?: string;
	modules?: string[];
}

export interface EducationItem {
	id: string;
	institution: string;
	location: string;
	degree: string;
	period: string;
	grade?: string;
	exchangeBadge?: string;
	summary?: string;
	details?: EducationDetail[];
	modulesLabel?: string;
	modules?: string[];
	exchange?: EducationExchange;
}

export interface SkillGroup {
	category: string;
	items: string[];
}

export interface TranslationMap {
	site_meta_description: string;
	nav_sections: NavSection[];
	blog: string;
	blog_aria: string;
	grid_label: string;
	theme_light: string;
	theme_dark: string;
	back_home: string;
	credits_label: string;
	privacy_label: string;
	expand_hint: string;

	section_intro_label: string;
	section_experience_label: string;
	section_projects_label: string;
	section_education_label: string;
	section_skills_contact_label: string;

	intro_heading: string;
	intro_bio: string;
	intro_pills: string[];
	intro_blog_cta: string;
	intro_contact_cta: string;

	experience_items: ExperienceItem[];
	project_items: ProjectItem[];
	education_items: EducationItem[];

	skills_heading: string;
	skill_groups: SkillGroup[];
	contact_heading: string;
	contact_email_label: string;
	contact_linkedin_label: string;
}

export type TranslationKey = keyof TranslationMap;
