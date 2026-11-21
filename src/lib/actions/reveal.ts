import type { Action } from 'svelte/action';

/**
 * Subtle fade-up reveal on scroll using IntersectionObserver.
 * SSR-safe: content stays visible by default unless JavaScript determines the element
 * is below the initial fold and motion is permitted.
 */
export const reveal: Action<HTMLElement> = (node) => {
	if (typeof window === 'undefined') {
		return {};
	}

	const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (prefersReduced || typeof IntersectionObserver === 'undefined') {
		return {};
	}

	const rect = node.getBoundingClientRect();
	if (rect.top <= window.innerHeight * 0.92) {
		return {};
	}

	node.classList.add('reveal-ready', 'reveal-hidden');

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.classList.remove('reveal-hidden');
					node.classList.add('reveal-visible');
					observer.unobserve(node);
					observer.disconnect();
					break;
				}
			}
		},
		{
			threshold: 0.08,
			rootMargin: '0px 0px -24px 0px'
		}
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
};
