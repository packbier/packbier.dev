export type Theme = 'light' | 'dark';

export const theme = themeStore('light');

function themeStore(initial: Theme) {
	let initialTheme: Theme = initial;

	// Initialize from localStorage on client side; light paper is default
	if (typeof window !== 'undefined') {
		try {
			if (localStorage.getItem('theme') === 'dark') {
				initialTheme = 'dark';
			}
		} catch {
			// Ignore storage access errors
		}
		applyTheme(initialTheme);
	}

	let store = $state<Theme>(initialTheme);

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
				try {
					localStorage.setItem('theme', newTheme);
				} catch {
					// Ignore storage access errors
				}
				applyTheme(newTheme);
			}
		},
		toggle() {
			this.set(store === 'light' ? 'dark' : 'light');
		}
	};
}
