<script lang="ts">
	import { language, t } from '$lib/language.svelte';

	const isDe = $derived(language.get === 'de');
</script>

<svelte:head>
	<title>
		{isDe ? 'Datenschutzerklärung | Martin Packbier' : 'Privacy Policy | Martin Packbier'}
	</title>
	<meta
		name="description"
		content={isDe ? 'Datenschutzerklärung für packbier.dev' : 'Privacy Policy for packbier.dev'}
	/>
</svelte:head>

<main class="mx-auto max-w-[1080px] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
	<div class="mb-10 flex flex-wrap items-center justify-between gap-4">
		<a
			href="/"
			class="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.05em] text-[var(--ink-muted)] uppercase transition-colors hover:text-[var(--accent-ink)]"
		>
			<span aria-hidden="true">&larr;</span>
			<span>{t('back_home')}</span>
		</a>

		<span class="font-mono text-[11px] tracking-[0.05em] text-[var(--ink-muted)] uppercase">
			{isDe ? 'RECHTLICHES / DATENSCHUTZ' : 'LEGAL / PRIVACY POLICY'}
		</span>
	</div>

	<header class="mb-10 space-y-3">
		<h1 class="text-3xl font-semibold tracking-[-0.02em] text-[var(--ink-primary)] sm:text-4xl">
			{isDe ? 'Datenschutzerklärung' : 'Privacy Policy'}
		</h1>
		<p class="max-w-[64ch] text-[15px] leading-relaxed text-[var(--ink-secondary)]">
			{isDe
				? 'Informationen zur Verarbeitung technischer Daten und zur lokalen Speicherung auf packbier.dev.'
				: 'Information regarding technical data processing and local browser storage on packbier.dev.'}
		</p>
	</header>

	<div class="border-t border-[var(--rule)]">
		{#if isDe}
			<section
				class="grid grid-cols-1 gap-x-4 gap-y-4 border-b border-[var(--rule)] py-8 md:gap-x-6 lg:grid-cols-12"
			>
				<h2
					class="font-mono text-[11px] font-medium tracking-[0.06em] text-[var(--ink-muted)] uppercase lg:col-span-3"
				>
					01 / Überblick
				</h2>
				<div class="space-y-3 text-[15px] leading-[1.7] text-[var(--ink-secondary)] lg:col-span-9">
					<p>
						<strong class="font-medium text-[var(--ink-primary)]">packbier.dev</strong> ist eine
						statische persönliche Portfolio-Website von
						<strong class="font-medium text-[var(--ink-primary)]">Martin Packbier</strong>
						(<a
							href="mailto:packbier.martin@gmail.com"
							class="text-[var(--ink-primary)] underline decoration-[var(--accent)] underline-offset-4 transition-colors hover:text-[var(--accent-ink)]"
							>packbier.martin@gmail.com</a
						>).
					</p>
					<p>
						Diese Website setzt <strong class="font-medium text-[var(--ink-primary)]"
							>keine Cookies</strong
						>
						und verwendet
						<strong class="font-medium text-[var(--ink-primary)]"
							>kein Google Analytics, keinen Google Tag Manager</strong
						> und kein websiteübergreifendes Tracking.
					</p>
				</div>
			</section>

			<section
				class="grid grid-cols-1 gap-x-4 gap-y-4 border-b border-[var(--rule)] py-8 md:gap-x-6 lg:grid-cols-12"
			>
				<h2
					class="font-mono text-[11px] font-medium tracking-[0.06em] text-[var(--ink-muted)] uppercase lg:col-span-3"
				>
					02 / localStorage
				</h2>
				<div class="space-y-4 text-[15px] leading-[1.7] text-[var(--ink-secondary)] lg:col-span-9">
					<p>
						Um Ihre gewählte Darstellung (Hell- oder Dunkelmodus) beim Neuladen zu erhalten, wird
						ausschließlich folgender Eintrag lokal in Ihrem Browser gespeichert:
					</p>
					<dl class="border border-[var(--rule)] bg-[var(--bg-surface)]/50">
						<div
							class="grid grid-cols-1 gap-y-1 border-b border-[var(--rule)] px-4 py-3 md:grid-cols-8 md:gap-x-6 lg:grid-cols-9"
						>
							<dt
								class="font-mono text-[11px] tracking-[0.05em] text-[var(--ink-muted)] uppercase md:col-span-2 lg:col-span-2"
							>
								Schlüssel
							</dt>
							<dd
								class="font-mono text-[13px] text-[var(--ink-primary)] md:col-span-6 lg:col-span-7"
							>
								<code>theme</code>
							</dd>
						</div>
						<div
							class="grid grid-cols-1 gap-y-1 border-b border-[var(--rule)] px-4 py-3 md:grid-cols-8 md:gap-x-6 lg:grid-cols-9"
						>
							<dt
								class="font-mono text-[11px] tracking-[0.05em] text-[var(--ink-muted)] uppercase md:col-span-2 lg:col-span-2"
							>
								Werte
							</dt>
							<dd
								class="font-mono text-[13px] text-[var(--ink-primary)] md:col-span-6 lg:col-span-7"
							>
								<code>"light"</code> oder <code>"dark"</code>
							</dd>
						</div>
						<div
							class="grid grid-cols-1 gap-y-1 border-b border-[var(--rule)] px-4 py-3 md:grid-cols-8 md:gap-x-6 lg:grid-cols-9"
						>
							<dt
								class="font-mono text-[11px] tracking-[0.05em] text-[var(--ink-muted)] uppercase md:col-span-2 lg:col-span-2"
							>
								Zweck
							</dt>
							<dd class="text-[14px] text-[var(--ink-secondary)] md:col-span-6 lg:col-span-7">
								Speicherung der gewählten Farbgebung, um ein Flackern beim Seitenaufruf zu
								vermeiden.
							</dd>
						</div>
						<div
							class="grid grid-cols-1 gap-y-1 px-4 py-3 md:grid-cols-8 md:gap-x-6 lg:grid-cols-9"
						>
							<dt
								class="font-mono text-[11px] tracking-[0.05em] text-[var(--ink-muted)] uppercase md:col-span-2 lg:col-span-2"
							>
								Übertragung
							</dt>
							<dd class="text-[14px] text-[var(--ink-secondary)] md:col-span-6 lg:col-span-7">
								Verbleibt ausschließlich lokal in Ihrem Browser, wird nicht an Server übertragen und
								kann jederzeit über die Browser-Einstellungen gelöscht werden.
							</dd>
						</div>
					</dl>
				</div>
			</section>

			<section
				class="grid grid-cols-1 gap-x-4 gap-y-4 border-b border-[var(--rule)] py-8 md:gap-x-6 lg:grid-cols-12"
			>
				<h2
					class="font-mono text-[11px] font-medium tracking-[0.06em] text-[var(--ink-muted)] uppercase lg:col-span-3"
				>
					03 / Hosting &amp; Logs
				</h2>
				<div class="space-y-3 text-[15px] leading-[1.7] text-[var(--ink-secondary)] lg:col-span-9">
					<p>
						Diese Website wird über
						<strong class="font-medium text-[var(--ink-primary)]">Cloudflare</strong>
						(Cloudflare, Inc.) bereitgestellt. Beim Aufruf verarbeitet Cloudflare technisch erforderliche
						Verbindungsdaten (z. B. IP-Adresse, Zeitstempel, aufgerufene URL, Browser/User-Agent und Referrer),
						um die Website zuverlässig auszuliefern und vor Missbrauch bzw. DDoS-Angriffen zu schützen
						(Art. 6 Abs. 1 lit. f DSGVO). Weitere Informationen finden Sie in der
						<a
							href="https://www.cloudflare.com/privacypolicy/"
							target="_blank"
							rel="noopener noreferrer"
							class="text-[var(--ink-primary)] underline decoration-[var(--accent)] underline-offset-4 transition-colors hover:text-[var(--accent-ink)]"
							>Datenschutzerklärung von Cloudflare &#8599;</a
						>.
					</p>
				</div>
			</section>

			<section
				class="grid grid-cols-1 gap-x-4 gap-y-4 border-b border-[var(--rule)] py-8 md:gap-x-6 lg:grid-cols-12"
			>
				<h2
					class="font-mono text-[11px] font-medium tracking-[0.06em] text-[var(--ink-muted)] uppercase lg:col-span-3"
				>
					04 / Webanalyse
				</h2>
				<div class="space-y-3 text-[15px] leading-[1.7] text-[var(--ink-secondary)] lg:col-span-9">
					<p>
						Zur statistischen Auswertung der Seitenaufrufe nutzt diese Website
						<strong class="font-medium text-[var(--ink-primary)]">Cloudflare Web Analytics</strong>.
						Dabei werden aggregierte Kennzahlen (z. B. Seitenaufrufe, Referrer und Ladezeiten)
						datenschutzfreundlich erfasst –
						<strong class="font-medium text-[var(--ink-primary)]">ohne Cookies</strong>, ohne
						Auslesen von <code class="font-mono text-[13px]">localStorage</code> und ohne Verfolgung einzelner
						Personen über verschiedene Websites hinweg.
					</p>
				</div>
			</section>

			<section
				class="grid grid-cols-1 gap-x-4 gap-y-4 border-b border-[var(--rule)] py-8 md:gap-x-6 lg:grid-cols-12"
			>
				<h2
					class="font-mono text-[11px] font-medium tracking-[0.06em] text-[var(--ink-muted)] uppercase lg:col-span-3"
				>
					05 / Schriftarten
				</h2>
				<div class="space-y-3 text-[15px] leading-[1.7] text-[var(--ink-secondary)] lg:col-span-9">
					<p>
						Für eine einheitliche Typografie nutzt diese Website die Open-Source-Schriftarten
						<em>Geist</em> und <em>Geist Mono</em> (SIL Open Font License 1.1), die
						<strong class="font-medium text-[var(--ink-primary)]">lokal gehostet</strong> und direkt zusammen
						mit den statischen Assets dieser Website ausgeliefert werden. Es werden keine Anfragen an
						externe Schriftarten-Anbieter (wie Google Fonts) gestellt und keine IP-Adressen an Dritte
						übermittelt.
					</p>
				</div>
			</section>

			<section
				class="grid grid-cols-1 gap-x-4 gap-y-4 border-b border-[var(--rule)] py-8 md:gap-x-6 lg:grid-cols-12"
			>
				<h2
					class="font-mono text-[11px] font-medium tracking-[0.06em] text-[var(--ink-muted)] uppercase lg:col-span-3"
				>
					06 / Kontakt &amp; Links
				</h2>
				<div class="space-y-3 text-[15px] leading-[1.7] text-[var(--ink-secondary)] lg:col-span-9">
					<p>
						Wenn Sie per E-Mail an
						<a
							href="mailto:packbier.martin@gmail.com"
							class="text-[var(--ink-primary)] underline decoration-[var(--accent)] underline-offset-4 transition-colors hover:text-[var(--accent-ink)]"
							>packbier.martin@gmail.com</a
						>
						Kontakt aufnehmen, werden Ihre E-Mail-Adresse und Ihre Nachricht ausschließlich zur Bearbeitung
						Ihrer Anfrage verwendet (Art. 6 Abs. 1 lit. b bzw. lit. f DSGVO). Für verlinkte externe Websites
						(z. B. GitHub, LinkedIn, Blog) gelten deren jeweilige Datenschutzbestimmungen.
					</p>
				</div>
			</section>

			<section
				class="grid grid-cols-1 gap-x-4 gap-y-4 border-b border-[var(--rule)] py-8 md:gap-x-6 lg:grid-cols-12"
			>
				<h2
					class="font-mono text-[11px] font-medium tracking-[0.06em] text-[var(--ink-muted)] uppercase lg:col-span-3"
				>
					07 / Rechte (DSGVO)
				</h2>
				<div class="space-y-3 text-[15px] leading-[1.7] text-[var(--ink-secondary)] lg:col-span-9">
					<p>
						Sie haben gemäß DSGVO das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der
						Verarbeitung, Widerspruch (Art. 15–21 DSGVO) sowie das Recht auf Beschwerde bei einer
						Datenschutz-Aufsichtsbehörde (Art. 77 DSGVO).
					</p>
				</div>
			</section>
		{:else}
			<section
				class="grid grid-cols-1 gap-x-4 gap-y-4 border-b border-[var(--rule)] py-8 md:gap-x-6 lg:grid-cols-12"
			>
				<h2
					class="font-mono text-[11px] font-medium tracking-[0.06em] text-[var(--ink-muted)] uppercase lg:col-span-3"
				>
					01 / Overview
				</h2>
				<div class="space-y-3 text-[15px] leading-[1.7] text-[var(--ink-secondary)] lg:col-span-9">
					<p>
						<strong class="font-medium text-[var(--ink-primary)]">packbier.dev</strong> is a static
						personal portfolio website operated by
						<strong class="font-medium text-[var(--ink-primary)]">Martin Packbier</strong>
						(<a
							href="mailto:packbier.martin@gmail.com"
							class="text-[var(--ink-primary)] underline decoration-[var(--accent)] underline-offset-4 transition-colors hover:text-[var(--accent-ink)]"
							>packbier.martin@gmail.com</a
						>).
					</p>
					<p>
						This website sets <strong class="font-medium text-[var(--ink-primary)]"
							>zero cookies</strong
						>
						and uses
						<strong class="font-medium text-[var(--ink-primary)]"
							>no Google Analytics, Google Tag Manager</strong
						>, or cross-site tracking.
					</p>
				</div>
			</section>

			<section
				class="grid grid-cols-1 gap-x-4 gap-y-4 border-b border-[var(--rule)] py-8 md:gap-x-6 lg:grid-cols-12"
			>
				<h2
					class="font-mono text-[11px] font-medium tracking-[0.06em] text-[var(--ink-muted)] uppercase lg:col-span-3"
				>
					02 / localStorage
				</h2>
				<div class="space-y-4 text-[15px] leading-[1.7] text-[var(--ink-secondary)] lg:col-span-9">
					<p>
						To remember your chosen light or dark appearance across page loads, only the following
						entry is stored locally in your browser:
					</p>
					<dl class="border border-[var(--rule)] bg-[var(--bg-surface)]/50">
						<div
							class="grid grid-cols-1 gap-y-1 border-b border-[var(--rule)] px-4 py-3 md:grid-cols-8 md:gap-x-6 lg:grid-cols-9"
						>
							<dt
								class="font-mono text-[11px] tracking-[0.05em] text-[var(--ink-muted)] uppercase md:col-span-2 lg:col-span-2"
							>
								Key
							</dt>
							<dd
								class="font-mono text-[13px] text-[var(--ink-primary)] md:col-span-6 lg:col-span-7"
							>
								<code>theme</code>
							</dd>
						</div>
						<div
							class="grid grid-cols-1 gap-y-1 border-b border-[var(--rule)] px-4 py-3 md:grid-cols-8 md:gap-x-6 lg:grid-cols-9"
						>
							<dt
								class="font-mono text-[11px] tracking-[0.05em] text-[var(--ink-muted)] uppercase md:col-span-2 lg:col-span-2"
							>
								Values
							</dt>
							<dd
								class="font-mono text-[13px] text-[var(--ink-primary)] md:col-span-6 lg:col-span-7"
							>
								<code>"light"</code> or <code>"dark"</code>
							</dd>
						</div>
						<div
							class="grid grid-cols-1 gap-y-1 border-b border-[var(--rule)] px-4 py-3 md:grid-cols-8 md:gap-x-6 lg:grid-cols-9"
						>
							<dt
								class="font-mono text-[11px] tracking-[0.05em] text-[var(--ink-muted)] uppercase md:col-span-2 lg:col-span-2"
							>
								Purpose
							</dt>
							<dd class="text-[14px] text-[var(--ink-secondary)] md:col-span-6 lg:col-span-7">
								Saves your selected theme locally so the page loads in your chosen appearance
								without flashing.
							</dd>
						</div>
						<div
							class="grid grid-cols-1 gap-y-1 px-4 py-3 md:grid-cols-8 md:gap-x-6 lg:grid-cols-9"
						>
							<dt
								class="font-mono text-[11px] tracking-[0.05em] text-[var(--ink-muted)] uppercase md:col-span-2 lg:col-span-2"
							>
								Retention
							</dt>
							<dd class="text-[14px] text-[var(--ink-secondary)] md:col-span-6 lg:col-span-7">
								Stored strictly locally in your browser, never transmitted to any server, and
								removable anytime via your browser settings.
							</dd>
						</div>
					</dl>
				</div>
			</section>

			<section
				class="grid grid-cols-1 gap-x-4 gap-y-4 border-b border-[var(--rule)] py-8 md:gap-x-6 lg:grid-cols-12"
			>
				<h2
					class="font-mono text-[11px] font-medium tracking-[0.06em] text-[var(--ink-muted)] uppercase lg:col-span-3"
				>
					03 / Hosting &amp; Logs
				</h2>
				<div class="space-y-3 text-[15px] leading-[1.7] text-[var(--ink-secondary)] lg:col-span-9">
					<p>
						This website is hosted on
						<strong class="font-medium text-[var(--ink-primary)]">Cloudflare</strong>
						(Cloudflare, Inc.). When you visit, technical connection metadata (such as IP address, timestamp,
						requested URL, browser/user agent, and referrer) is processed to deliver the site reliably
						and protect against abuse and DDoS attacks (Art. 6(1)(f) GDPR). See the
						<a
							href="https://www.cloudflare.com/privacypolicy/"
							target="_blank"
							rel="noopener noreferrer"
							class="text-[var(--ink-primary)] underline decoration-[var(--accent)] underline-offset-4 transition-colors hover:text-[var(--accent-ink)]"
							>Cloudflare Privacy Policy &#8599;</a
						>.
					</p>
				</div>
			</section>

			<section
				class="grid grid-cols-1 gap-x-4 gap-y-4 border-b border-[var(--rule)] py-8 md:gap-x-6 lg:grid-cols-12"
			>
				<h2
					class="font-mono text-[11px] font-medium tracking-[0.06em] text-[var(--ink-muted)] uppercase lg:col-span-3"
				>
					04 / Analytics
				</h2>
				<div class="space-y-3 text-[15px] leading-[1.7] text-[var(--ink-secondary)] lg:col-span-9">
					<p>
						This website uses privacy-first, cookieless
						<strong class="font-medium text-[var(--ink-primary)]">Cloudflare Web Analytics</strong>
						to measure aggregated page views, referrers, and performance metrics—without setting cookies,
						reading <code class="font-mono text-[13px]">localStorage</code>, or tracking individuals
						across websites.
					</p>
				</div>
			</section>

			<section
				class="grid grid-cols-1 gap-x-4 gap-y-4 border-b border-[var(--rule)] py-8 md:gap-x-6 lg:grid-cols-12"
			>
				<h2
					class="font-mono text-[11px] font-medium tracking-[0.06em] text-[var(--ink-muted)] uppercase lg:col-span-3"
				>
					05 / Web Fonts
				</h2>
				<div class="space-y-3 text-[15px] leading-[1.7] text-[var(--ink-secondary)] lg:col-span-9">
					<p>
						This website uses the open-source typefaces <em>Geist</em> and <em>Geist Mono</em>
						(SIL Open Font License 1.1),
						<strong class="font-medium text-[var(--ink-primary)]">self-hosted locally</strong>
						alongside the static site assets. No requests are made to external font providers such as
						Google Fonts, and no IP addresses or personal data are transmitted to third-party font servers.
					</p>
				</div>
			</section>

			<section
				class="grid grid-cols-1 gap-x-4 gap-y-4 border-b border-[var(--rule)] py-8 md:gap-x-6 lg:grid-cols-12"
			>
				<h2
					class="font-mono text-[11px] font-medium tracking-[0.06em] text-[var(--ink-muted)] uppercase lg:col-span-3"
				>
					06 / Contact &amp; Links
				</h2>
				<div class="space-y-3 text-[15px] leading-[1.7] text-[var(--ink-secondary)] lg:col-span-9">
					<p>
						If you send an email to
						<a
							href="mailto:packbier.martin@gmail.com"
							class="text-[var(--ink-primary)] underline decoration-[var(--accent)] underline-offset-4 transition-colors hover:text-[var(--accent-ink)]"
							>packbier.martin@gmail.com</a
						>, your email address and message are used solely to respond to your inquiry (Art.
						6(1)(b)/(f) GDPR). External links (e.g., GitHub, LinkedIn, Blog) are governed by their
						respective privacy policies.
					</p>
				</div>
			</section>

			<section
				class="grid grid-cols-1 gap-x-4 gap-y-4 border-b border-[var(--rule)] py-8 md:gap-x-6 lg:grid-cols-12"
			>
				<h2
					class="font-mono text-[11px] font-medium tracking-[0.06em] text-[var(--ink-muted)] uppercase lg:col-span-3"
				>
					07 / Your Rights (GDPR)
				</h2>
				<div class="space-y-3 text-[15px] leading-[1.7] text-[var(--ink-secondary)] lg:col-span-9">
					<p>
						Under the GDPR, you have the right to access, rectification, erasure, restriction of
						processing, objection (Arts. 15–21 GDPR), and the right to lodge a complaint with a data
						protection supervisory authority (Art. 77 GDPR).
					</p>
				</div>
			</section>
		{/if}
	</div>

	<div class="mt-10">
		<a
			href="/"
			class="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.05em] text-[var(--ink-muted)] uppercase transition-colors hover:text-[var(--accent-ink)]"
		>
			<span aria-hidden="true">&larr;</span>
			<span>{t('back_home')}</span>
		</a>
	</div>
</main>
