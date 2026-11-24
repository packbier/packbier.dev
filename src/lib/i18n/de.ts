import type { TranslationMap } from '.';

const de: TranslationMap = {
	site_meta_description:
		'Martin Packbier — Informatik-Masterstudent (M.Sc.) an der FH Aachen mit Fokus auf verlässliche Software, Web- und Backend-Systeme.',
	nav_sections: [
		{ id: 'intro', num: '01', label: 'Intro' },
		{ id: 'experience', num: '02', label: 'Erfahrung' },
		{ id: 'projects', num: '03', label: 'Projekte & Forschung' },
		{ id: 'education', num: '04', label: 'Ausbildung' },
		{ id: 'skills-contact', num: '05', label: 'Skills & Kontakt' }
	],
	blog: 'Blog',
	blog_aria: 'Blog auf blog.packbier.dev öffnen',
	grid_label: 'GRID',
	theme_light: 'Light',
	theme_dark: 'Dark',
	back_home: 'Zurück zum Portfolio',
	credits_label: 'Impressum',
	privacy_label: 'Datenschutz',
	expand_hint: 'Zeile zum Öffnen wählen',

	section_intro_label: '01 / INTRO',
	section_experience_label: '02 / ERFAHRUNG',
	section_projects_label: '03 / PROJEKTE & FORSCHUNG',
	section_education_label: '04 / AUSBILDUNG',
	section_skills_contact_label: '05 / SKILLS & KONTAKT',

	intro_heading: 'Hallo, ich bin Martin Packbier.',
	intro_bio:
		'Ich studiere Informatik im Master (M.Sc.) an der FH Aachen. Ich entwickle gerne verlässliche Software, entdecke neue Technologien und arbeite an Web- und Backend-Systemen.',
	intro_pills: ['M.SC. INFORMATIK · FH AACHEN'],
	intro_blog_cta: 'Zum Blog',
	intro_contact_cta: 'Kontakt',

	experience_items: [
		{
			id: 'exp-scora',
			role: 'Wissenschaftliche Hilfskraft – Softwareentwickler (SCORA)',
			organization: 'FH Aachen',
			location: 'Aachen, Deutschland',
			period: '02/2026 – 08/2026',
			badge: '[DEV]',
			summary:
				'Entwicklung von Funktionen für die Laravel-Webanwendung SCORA (Smart Course Assistant), einschließlich KI-gestützter Tools und einer Upload-Pipeline zur Umwandlung bestehender Lehrmaterialien in eigenständige Mikromodule auf Basis von Dozierenden-Feedback.',
			bullets: [
				'Arbeit am Stack aus PHP, Laravel, Filament und Nginx – mit Einsatz von Codex zur Beschleunigung von Implementierung und Iteration.'
			],
			tags: ['PHP', 'Laravel', 'Filament', 'Nginx', 'Codex', 'KI-Integration']
		},
		{
			id: 'exp-tutor-db',
			role: 'Studentische Hilfskraft – Datenbanken & Webtechnologien',
			organization: 'FH Aachen',
			location: 'Aachen, Deutschland',
			period: '10/2024 – 01/2026 · 03/2026 – 06/2026',
			badge: '[LEHRE]',
			summary:
				'Betreuung von 4 Übungsgruppen im WS 24/25, 6 Gruppen im WS 25/26 (~40 Studierende pro Gruppe) sowie 6 Gruppen im SS 26 (30–40 Studierende pro Gruppe) in den Modulen Datenbanken und Webtechnologien 1 & 2.',
			bullets: [
				'Technische Unterstützung während der Implementierung sowie Bewertung zweiwöchentlicher Projektmeilensteine.',
				'Durchführung von Code-Reviews und Vermittlung von Best Practices in Datenbankdesign, SQL-Optimierung und Webentwicklung.'
			],
			tags: ['PHP', 'SQL', 'JavaScript', 'Webentwicklung', 'Code Review']
		},
		{
			id: 'exp-tutor-cs',
			role: 'Studentische Hilfskraft – Grundlagen der Informatik & Programmierung',
			organization: 'FH Aachen',
			location: 'Aachen, Deutschland',
			period: '10/2023 – 01/2024',
			badge: '[LEHRE]',
			summary:
				'Betreuung einer Übungsgruppe mit 20 Studierenden im Modul Grundlagen der Informatik und höhere Programmiersprache.',
			bullets: [
				'Unterstützung der Studierenden in Praktika bei C++, OOP und Debugging-Techniken sowie Bewertung wöchentlicher Programmieraufgaben.'
			],
			tags: ['C++', 'OOP', 'Code Review']
		}
	],

	project_items: [
		{
			id: 'proj-sysml',
			title: 'SysML v1 → SysML v2 Semantische Äquivalenz',
			context: 'Bachelorarbeit',
			location: 'FH Aachen',
			period: '2026',
			badge: '[FORSCHUNG]',
			metaLabel: 'Titel der Arbeit',
			metaValue:
				'„Analysis of Semantic Equivalence in the Transformation of SysML v1 to SysML v2 Models“',
			summary:
				'Konzeptionelle Forschung im Bereich Model-Based Systems Engineering (MBSE) zur Analyse von Transformationsregeln und semantischer Äquivalenz zwischen SysML v1 und v2.',
			bullets: [],
			tags: ['SysML v1/v2', 'MBSE', 'Systems Engineering']
		},
		{
			id: 'proj-ml-doc',
			title: 'ML-gestützte Dokumentenverarbeitung',
			context: 'Interdisziplinäres Projekt',
			location: 'FH Aachen',
			period: '2024 · Note 1.3',
			badge: '[ML / WEB]',
			metaLabel: 'Betreut von',
			metaValue: 'Michael Plagge (plagge.it)',
			summary:
				'Entwicklung eines ML- und OCR-gestützten Rechnungs-Automatisierungssystems für einen Zusammenschluss kleinerer Druckereien, die über gemeinsame Rahmenverträge Mengenrabatte bei Großdruckereien erzielen.',
			bullets: [
				'Automatisierte Einordnung eingehender Rechnungen in ein Verarbeitungssystem nach Erstellungsdatum, Lieferant, Lieferung und jeweiliger Druckerei.',
				'Entwicklung der Human-in-the-Loop-Weboberfläche für den Fehlerfall: Überwachung der OCR-Ergebnisse sowie manuelle Prüfung, Korrektur und Zuordnung, wenn die automatische Verarbeitung fehlschlug.',
				'Bereitstellung einer sauberen, verlässlichen Datenbasis für die Berechnung gemeinsamer Mengenrabatte.'
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
			location: 'Aachen, Deutschland',
			degree: 'M.Sc. in Informatik',
			period: '03/2026 – 07/2028',
			summary:
				'Masterstudium der Informatik an der FH Aachen mit Fokus auf Software Engineering sowie moderne Web- und Backend-Systeme.',
			details: [{ label: 'Status', value: 'Laufend' }]
		},
		{
			id: 'edu-bsc',
			institution: 'FH Aachen',
			location: 'Aachen, Deutschland',
			degree: 'B.Sc. in Informatik',
			period: '09/2022 – 02/2026',
			grade: 'Note: 1.8',
			exchangeBadge: '+ Auslandssemester',
			details: [
				{ label: 'Schwerpunkt', value: 'Software Engineering' },
				{
					label: 'Bachelorarbeit',
					value:
						'„Analysis of Semantic Equivalence in the Transformation of SysML v1 to SysML v2 Models“'
				}
			],
			modulesLabel: 'Relevante Module',
			modules: [
				'Model-Based Systems Engineering (MBSE)',
				'Systems Safety Engineering',
				'Modellierung verteilter Systeme',
				'Datenbanken & Webtechnologien (1 & 2)',
				'DevOps'
			],
			exchange: {
				mainTabLabel: 'FH Aachen',
				tabLabel: 'Ausland · Taipei Tech',
				institution: 'National Taipei University of Technology (Taipei Tech)',
				location: 'Taipeh, Taiwan',
				period: '02/2025 – 06/2025',
				grade: 'GPA: 3.8/4.0',
				modulesLabel: 'Module',
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
			location: 'Eupen, Belgien',
			degree: 'Abitur',
			period: '09/2016 – 06/2022',
			grade: 'Note: 73%',
			details: [{ label: 'Schwerpunkt', value: 'Informatik und Design' }]
		}
	],

	skills_heading: 'Skills & Sprachen',
	skill_groups: [
		{
			category: 'Programmiersprachen',
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
				'Webentwicklung'
			]
		},
		{
			category: 'Methoden & Tools',
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
			category: 'Sprachen',
			items: ['Deutsch (Muttersprache / C2)', 'Englisch (Fließend / DAAD B2)', 'Französisch (B2)']
		}
	],
	contact_heading: 'Kontakt',
	contact_email_label: 'E-Mail',
	contact_linkedin_label: 'LinkedIn'
};

export default de;
