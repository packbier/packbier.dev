import type { TranslationMap } from '.';

const en: TranslationMap = {
	site_meta_description:
		'Martin Packbier — M.Sc. Computer Science student at FH Aachen building reliable software across web and backend systems.',
	nav_sections: [
		{ id: 'intro', num: '01', label: 'Intro' },
		{ id: 'experience', num: '02', label: 'Experience' },
		{ id: 'projects', num: '03', label: 'Projects & Research' },
		{ id: 'education', num: '04', label: 'Education' },
		{ id: 'skills-contact', num: '05', label: 'Skills & Contact' }
	],
	blog: 'Blog',
	blog_aria: 'Open Blog at blog.packbier.dev',
	grid_label: 'GRID',
	theme_light: 'Light',
	theme_dark: 'Dark',
	back_home: 'Back to portfolio',
	credits_label: 'Credits',
	privacy_label: 'Privacy',
	expand_hint: 'Select row to inspect',

	section_intro_label: '01 / INTRO',
	section_experience_label: '02 / EXPERIENCE',
	section_projects_label: '03 / PROJECTS & RESEARCH',
	section_education_label: '04 / EDUCATION',
	section_skills_contact_label: '05 / SKILLS & CONTACT',

	intro_heading: 'Hi, I’m Martin Packbier.',
	intro_bio:
		'I’m an M.Sc. Computer Science student at FH Aachen who enjoys building reliable software, exploring new technologies, and working across web and backend systems.',
	intro_pills: ['M.SC. COMPUTER SCIENCE · FH AACHEN'],
	intro_blog_cta: 'Read the Blog',
	intro_contact_cta: 'Get in touch',

	experience_items: [
		{
			id: 'exp-scora',
			role: 'Research Assistant – Software Developer (SCORA)',
			organization: 'FH Aachen',
			location: 'Aachen, Germany',
			period: '02/2026 – 08/2026',
			badge: '[DEVELOPING]',
			summary:
				'Developed features for the Laravel web application SCORA (Smart Course Assistant), building AI-assisted tools and an upload pipeline to transform existing teaching materials into self-contained micro-modules based on lecturer feedback.',
			bullets: [
				'Worked across a PHP, Laravel, Filament, and Nginx stack, using Codex to accelerate feature implementation and iteration.'
			],
			tags: ['PHP', 'Laravel', 'Filament', 'Nginx', 'Codex', 'AI Integration']
		},
		{
			id: 'exp-tutor-db',
			role: 'Student Teaching Assistant – Databases & Web Technologies',
			organization: 'FH Aachen',
			location: 'Aachen, Germany',
			period: '10/2024 – 01/2026 · 03/2026 – 06/2026',
			badge: '[TUTOR]',
			summary:
				'Supervised 4 exercise groups in Winter term 2024/25, 6 groups in Winter term 2025/26 (~40 students each), and 6 groups in Summer term 2026 (30–40 students each) across Databases and Web Technologies 1 & 2.',
			bullets: [
				'Provided technical support during implementation and evaluated bi-weekly project milestones.',
				'Conducted code reviews and taught best practices in database design, SQL optimization, and web development.'
			],
			tags: ['PHP', 'SQL', 'JavaScript', 'Web Development', 'Code Review']
		},
		{
			id: 'exp-tutor-cs',
			role: 'Student Teaching Assistant – Fundamentals of CS & Programming',
			organization: 'FH Aachen',
			location: 'Aachen, Germany',
			period: '10/2023 – 01/2024',
			badge: '[TUTOR]',
			summary:
				'Mentored an exercise group of 20 students in Fundamentals of Computer Science and Introduction to Programming.',
			bullets: [
				'Supported students in lab sessions with C++, OOP, and debugging techniques, and assessed weekly programming assignments.'
			],
			tags: ['C++', 'OOP', 'Code Review']
		}
	],

	project_items: [
		{
			id: 'proj-sysml',
			title: 'SysML v1 → SysML v2 Semantic Equivalence',
			context: "Bachelor's Thesis",
			location: 'FH Aachen',
			period: '2026',
			badge: '[RESEARCH]',
			metaLabel: 'Thesis Title',
			metaValue:
				'"Analysis of Semantic Equivalence in the Transformation of SysML v1 to SysML v2 Models"',
			summary:
				'Conceptual Model-Based Systems Engineering (MBSE) research analyzing transformation rules and semantic preservation between SysML v1 and v2.',
			bullets: [],
			tags: ['SysML v1/v2', 'MBSE', 'Systems Engineering']
		},
		{
			id: 'proj-ml-doc',
			title: 'ML-supported Document Processing',
			context: 'Interdisciplinary Project',
			location: 'FH Aachen',
			period: '2024 · Grade 1.3',
			badge: '[ML / WEB]',
			metaLabel: 'Supervised by',
			metaValue: 'Michael Plagge (plagge.it)',
			summary:
				'Built an ML- and OCR-assisted invoice automation system for a purchasing cooperative of smaller print shops pooling their orders under shared contracts to earn bulk volume discounts from larger print suppliers.',
			bullets: [
				'Sorted incoming invoices into an automated processing pipeline by identifying creation date, supplier, delivery, and receiving print shop.',
				'Built the Human-in-the-Loop web interface for exception handling—allowing operators to monitor OCR accuracy and manually review, correct, or reassign invoices whenever automated processing failed.',
				'Provided a clean, reliable database to calculate collective volume discounts.'
			],
			tags: [
				'Python',
				'Tesseract OCR',
				'Machine Learning',
				'JavaScript',
				'SQL',
				'Human-in-the-Loop'
			]
		}
	],

	education_items: [
		{
			id: 'edu-msc',
			institution: 'FH Aachen',
			location: 'Aachen, Germany',
			degree: 'M.Sc. in Computer Science',
			period: '03/2026 – 07/2028',
			summary:
				'Graduate program in Computer Science at FH Aachen, focusing on software engineering and modern web and backend systems.',
			details: [{ label: 'Status', value: 'In Progress' }]
		},
		{
			id: 'edu-bsc',
			institution: 'FH Aachen',
			location: 'Aachen, Germany',
			degree: 'B.Sc. in Computer Science',
			period: '09/2022 – 02/2026',
			grade: 'Grade: 1.8',
			exchangeBadge: '+ Exchange',
			details: [
				{ label: 'Focus', value: 'Software Engineering' },
				{
					label: 'Thesis',
					value:
						'"Analysis of Semantic Equivalence in the Transformation of SysML v1 to SysML v2 Models"'
				}
			],
			modulesLabel: 'Relevant Modules',
			modules: [
				'Model-Based Systems Engineering (MBSE)',
				'Systems Safety Engineering',
				'Modeling Distributed Systems',
				'Databases & Web Technologies (1 & 2)',
				'DevOps'
			],
			exchange: {
				mainTabLabel: 'FH Aachen',
				tabLabel: 'Exchange · Taipei Tech',
				institution: 'National Taipei University of Technology (Taipei Tech)',
				location: 'Taipei, Taiwan',
				period: '02/2025 – 06/2025',
				grade: 'GPA: 3.8/4.0',
				modulesLabel: 'Modules',
				modules: [
					'Cloud & IoT Security',
					'Analysis of Computer Algorithms',
					'Data Science',
					'Software Testing',
					'Autonomous Mobile Robotics'
				]
			}
		},
		{
			id: 'edu-kae',
			institution: 'Königliches Athenäum Eupen',
			location: 'Eupen, Belgium',
			degree: 'Abitur',
			period: '09/2016 – 06/2022',
			grade: 'Grade: 73%',
			details: [{ label: 'Focus', value: 'Computer Science and Design' }]
		}
	],

	skills_heading: 'Skills & Languages',
	skill_groups: [
		{
			category: 'Languages (Code)',
			items: ['Java', 'C++', 'TypeScript', 'PHP', 'Python', 'SQL', 'JavaScript', 'Go']
		},
		{
			category: 'Frameworks & Tech',
			items: [
				'Svelte',
				'Laravel',
				'Filament',
				'Machine Learning',
				'OCR',
				'REST APIs',
				'Web Development'
			]
		},
		{
			category: 'Methods & Tools',
			items: [
				'SysML v1/v2',
				'MBSE',
				'UML',
				'Git',
				'Nginx',
				'DevOps',
				'CI/CD',
				'Software Testing',
				'Agile'
			]
		},
		{
			category: 'Spoken Languages',
			items: ['German (Native / C2)', 'English (Fluent / DAAD B2)', 'French (B2)']
		}
	],
	contact_heading: 'Contact',
	contact_email_label: 'Email',
	contact_linkedin_label: 'LinkedIn'
};

export default en;
