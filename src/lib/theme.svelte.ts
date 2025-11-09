export type Theme = 'light' | 'dark';

export const theme = themeStore('light');

function themeStore(initial: Theme) {
    let store = $state<Theme>(initial);

    // Initialize from localStorage on client side
    if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('theme') as Theme | null;
        if (stored === 'light' || stored === 'dark') {
            store = stored;
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            store = 'dark';
        }
        // Apply theme immediately
        applyTheme(store);
    }

    function applyTheme(newTheme: Theme) {
        if (typeof document !== 'undefined') {
            if (newTheme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    }

    return {
        get get() {
            return store;
        },
        set(newTheme: Theme) {
            store = newTheme;
            if (typeof window !== 'undefined') {
                localStorage.setItem('theme', newTheme);
                applyTheme(newTheme);
            }
        },
        toggle() {
            this.set(store === 'light' ? 'dark' : 'light');
        }
    };
}