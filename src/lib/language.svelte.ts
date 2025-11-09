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