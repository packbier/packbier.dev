import de from '$lib/i18n/de';
import en from '$lib/i18n/en';

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

export function t<T = string>(key: string): T {
    if (language.get === 'de') {
        return de[key] ?? key;
    } else {
        return en[key] ?? key;
    }
}