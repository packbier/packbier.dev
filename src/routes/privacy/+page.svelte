<script lang="ts">
	import LanguageSelector from '$lib/components/LanguageSelector.svelte';
	import ThemeSwitcher from '$lib/components/ThemeSelector.svelte';
	import { language } from '$lib/language.svelte';

	const isDe = $derived(language.get === 'de');
</script>

<svelte:head>
	<title
		>{isDe ? 'Datenschutzerklärung | Martin Packbier' : 'Privacy Policy | Martin Packbier'}</title
	>
	<meta
		name="description"
		content={isDe ? 'Datenschutzerklärung für packbier.dev' : 'Privacy Policy for packbier.dev'}
	/>
</svelte:head>

<main class="transition-text min-h-screen p-8 font-sans text-black md:p-12 dark:text-white">
	<div class="mx-auto max-w-2xl">
		<div class="mb-12 flex flex-wrap items-center justify-between gap-4">
			<h1 class="text-4xl font-bold">
				{isDe ? 'Datenschutzerklärung' : 'Privacy Policy'}
			</h1>
			<div class="flex flex-wrap items-center gap-3">
				<LanguageSelector />
				<ThemeSwitcher />
			</div>
		</div>

		<div class="space-y-10">
			{#if isDe}
				<section class="space-y-3">
					<h2 class="text-2xl font-semibold">Überblick</h2>
					<p>
						<strong>packbier.dev</strong> ist eine statische persönliche Portfolio-Website von
						<strong>Martin Packbier</strong>
						(<a
							href="mailto:packbier.martin@gmail.com"
							class="text-blue-600 hover:underline dark:text-blue-400">packbier.martin@gmail.com</a
						>).
					</p>
					<p>
						Diese Website setzt <strong>keine Cookies</strong> und verwendet
						<strong>kein Google Analytics, keinen Google Tag Manager</strong> und kein websiteübergreifendes
						Tracking.
					</p>
				</section>

				<section class="space-y-3">
					<h2 class="text-2xl font-semibold">Lokale Speicherung im Browser (localStorage)</h2>
					<p>
						Um Ihre gewählte Darstellung (Hell- oder Dunkelmodus) beim Neuladen zu erhalten, wird
						ausschließlich folgender Eintrag lokal in Ihrem Browser gespeichert:
					</p>
					<div
						class="rounded-xl border border-black/15 bg-black/5 p-4 text-sm backdrop-blur-sm dark:border-white/15 dark:bg-white/10"
					>
						<ul class="space-y-1.5">
							<li><strong>Schlüssel:</strong> <code>theme</code></li>
							<li><strong>Werte:</strong> <code>"light"</code> oder <code>"dark"</code></li>
							<li>
								<strong>Zweck:</strong> Speicherung der gewählten Farbgebung, um ein Flackern beim Seitenaufruf
								zu vermeiden.
							</li>
							<li>
								<strong>Speicherdauer &amp; Übertragung:</strong> Verbleibt ausschließlich lokal in Ihrem
								Browser, wird nicht an Server übertragen und kann jederzeit über die Browser-Einstellungen
								gelöscht werden.
							</li>
						</ul>
					</div>
				</section>

				<section class="space-y-3">
					<h2 class="text-2xl font-semibold">Hosting &amp; Server-Logfiles (Cloudflare)</h2>
					<p>
						Diese Website wird über <strong>Cloudflare</strong> (Cloudflare, Inc.) bereitgestellt.
						Beim Aufruf verarbeitet Cloudflare technisch erforderliche Verbindungsdaten (z. B.
						IP-Adresse, Zeitstempel, aufgerufene URL, Browser/User-Agent und Referrer), um die
						Website zuverlässig auszuliefern und vor Missbrauch bzw. DDoS-Angriffen zu schützen
						(Art. 6 Abs. 1 lit. f DSGVO). Weitere Informationen finden Sie in der
						<a
							href="https://www.cloudflare.com/privacypolicy/"
							target="_blank"
							rel="noopener noreferrer"
							class="text-blue-600 hover:underline dark:text-blue-400"
							>Datenschutzerklärung von Cloudflare</a
						>.
					</p>
				</section>

				<section class="space-y-3">
					<h2 class="text-2xl font-semibold">Cookie-freie Webanalyse (Cloudflare Web Analytics)</h2>
					<p>
						Zur statistischen Auswertung der Seitenaufrufe nutzt diese Website
						<strong>Cloudflare Web Analytics</strong>. Dabei werden aggregierte Kennzahlen (z. B.
						Seitenaufrufe, Referrer und Ladezeiten) datenschutzfreundlich erfasst –
						<strong>ohne Cookies</strong>, ohne Auslesen von <code>localStorage</code> und ohne Verfolgung
						einzelner Personen über verschiedene Websites hinweg.
					</p>
				</section>

				<section class="space-y-3">
					<h2 class="text-2xl font-semibold">Schriftarten (Google Fonts)</h2>
					<p>
						Für eine einheitliche Typografie lädt diese Website die Schriftart
						<em>Nunito Sans</em> über Google Fonts (<code>fonts.googleapis.com</code> /
						<code>fonts.gstatic.com</code>). Dabei werden Ihre IP-Adresse und Standard-HTTP-Header
						an Google übermittelt. Weitere Informationen finden Sie in der
						<a
							href="https://policies.google.com/privacy"
							target="_blank"
							rel="noopener noreferrer"
							class="text-blue-600 hover:underline dark:text-blue-400"
							>Datenschutzerklärung von Google</a
						>.
					</p>
				</section>

				<section class="space-y-3">
					<h2 class="text-2xl font-semibold">Kontakt per E-Mail &amp; Externe Links</h2>
					<p>
						Wenn Sie per E-Mail an
						<a
							href="mailto:packbier.martin@gmail.com"
							class="text-blue-600 hover:underline dark:text-blue-400">packbier.martin@gmail.com</a
						>
						Kontakt aufnehmen, werden Ihre E-Mail-Adresse und Ihre Nachricht ausschließlich zur Bearbeitung
						Ihrer Anfrage verwendet (Art. 6 Abs. 1 lit. b bzw. lit. f DSGVO). Für verlinkte externe Websites
						(z. B. GitHub, LinkedIn) gelten deren jeweilige Datenschutzbestimmungen.
					</p>
				</section>

				<section class="space-y-3">
					<h2 class="text-2xl font-semibold">Ihre Rechte (DSGVO)</h2>
					<p>
						Sie haben gemäß DSGVO das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der
						Verarbeitung, Widerspruch (Art. 15–21 DSGVO) sowie das Recht auf Beschwerde bei einer
						Datenschutz-Aufsichtsbehörde (Art. 77 DSGVO).
					</p>
				</section>
			{:else}
				<section class="space-y-3">
					<h2 class="text-2xl font-semibold">Overview</h2>
					<p>
						<strong>packbier.dev</strong> is a static personal portfolio website operated by
						<strong>Martin Packbier</strong>
						(<a
							href="mailto:packbier.martin@gmail.com"
							class="text-blue-600 hover:underline dark:text-blue-400">packbier.martin@gmail.com</a
						>).
					</p>
					<p>
						This website sets <strong>zero cookies</strong> and uses
						<strong>no Google Analytics, Google Tag Manager</strong>, or cross-site tracking.
					</p>
				</section>

				<section class="space-y-3">
					<h2 class="text-2xl font-semibold">Local Browser Storage (localStorage)</h2>
					<p>
						To remember your chosen light or dark appearance across page loads, only the following
						entry is stored locally in your browser:
					</p>
					<div
						class="rounded-xl border border-black/15 bg-black/5 p-4 text-sm backdrop-blur-sm dark:border-white/15 dark:bg-white/10"
					>
						<ul class="space-y-1.5">
							<li><strong>Key:</strong> <code>theme</code></li>
							<li><strong>Values:</strong> <code>"light"</code> or <code>"dark"</code></li>
							<li>
								<strong>Purpose:</strong> Saves your selected theme locally so the page loads in your
								chosen appearance without flashing.
							</li>
							<li>
								<strong>Retention &amp; transmission:</strong> Stored strictly locally in your browser,
								never transmitted to any server, and removable anytime via your browser settings.
							</li>
						</ul>
					</div>
				</section>

				<section class="space-y-3">
					<h2 class="text-2xl font-semibold">Hosting &amp; Server Logs (Cloudflare)</h2>
					<p>
						This website is hosted on <strong>Cloudflare</strong> (Cloudflare, Inc.). When you
						visit, technical connection metadata (such as IP address, timestamp, requested URL,
						browser/user agent, and referrer) is processed to deliver the site reliably and protect
						against abuse and DDoS attacks (Art. 6(1)(f) GDPR). See the
						<a
							href="https://www.cloudflare.com/privacypolicy/"
							target="_blank"
							rel="noopener noreferrer"
							class="text-blue-600 hover:underline dark:text-blue-400">Cloudflare Privacy Policy</a
						>.
					</p>
				</section>

				<section class="space-y-3">
					<h2 class="text-2xl font-semibold">
						Cookieless Web Analytics (Cloudflare Web Analytics)
					</h2>
					<p>
						This website uses privacy-first, cookieless <strong>Cloudflare Web Analytics</strong> to
						measure aggregated page views, referrers, and performance metrics—without setting
						cookies, reading <code>localStorage</code>, or tracking individuals across websites.
					</p>
				</section>

				<section class="space-y-3">
					<h2 class="text-2xl font-semibold">Web Fonts (Google Fonts)</h2>
					<p>
						The <em>Nunito Sans</em> typeface is loaded from Google Fonts (<code
							>fonts.googleapis.com</code
						>
						/ <code>fonts.gstatic.com</code>), which transmits your IP address and standard HTTP
						request headers to Google. See the
						<a
							href="https://policies.google.com/privacy"
							target="_blank"
							rel="noopener noreferrer"
							class="text-blue-600 hover:underline dark:text-blue-400">Google Privacy Policy</a
						>.
					</p>
				</section>

				<section class="space-y-3">
					<h2 class="text-2xl font-semibold">Email Contact &amp; External Links</h2>
					<p>
						If you send an email to
						<a
							href="mailto:packbier.martin@gmail.com"
							class="text-blue-600 hover:underline dark:text-blue-400">packbier.martin@gmail.com</a
						>, your email address and message are used solely to respond to your inquiry (Art.
						6(1)(b)/(f) GDPR). External links (e.g., GitHub, LinkedIn) are governed by their
						respective privacy policies.
					</p>
				</section>

				<section class="space-y-3">
					<h2 class="text-2xl font-semibold">Your Rights (GDPR)</h2>
					<p>
						Under the GDPR, you have the right to access, rectification, erasure, restriction of
						processing, objection (Arts. 15–21 GDPR), and the right to lodge a complaint with a data
						protection supervisory authority (Art. 77 GDPR).
					</p>
				</section>
			{/if}
		</div>

		<div class="mt-16">
			<a
				href="/"
				class="inline-flex items-center text-sm font-medium text-gray-600 hover:text-black hover:underline dark:text-gray-400 dark:hover:text-white"
			>
				&larr; {isDe ? 'Zurück zur Startseite' : 'Back to Home'}
			</a>
		</div>
	</div>
</main>
