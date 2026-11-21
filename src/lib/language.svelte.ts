import de from '$lib/i18n/de';
import en from '$lib/i18n/en';
import type { TranslationKey, TranslationMap } from '$lib/i18n';

export type Language = 'en' | 'de';

export const language = languageStore('en');

function languageStore(initial: Language) {
	let store = $state<Language>(initial);
	return {
		get get() {
			return store;
		},
		set(newLanguage: Language) {
			store = newLanguage;
		}
	};
}

export function t<K extends TranslationKey>(key: K): TranslationMap[K] {
	if (language.get === 'de') {
		return de[key];
	} else {
		return en[key];
	}
}
