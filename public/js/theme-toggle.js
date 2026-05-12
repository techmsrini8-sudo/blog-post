/**
 * Theme toggle — cycles through light → dark → system.
 * Persists the choice in localStorage under the key "theme".
 * System mode removes data-theme from <html> so the OS
 * prefers-color-scheme media query governs instead.
 */

const STORAGE_KEY = 'theme';
const THEMES = ['light', 'dark', 'system'];

const ICONS = {
	light: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
	dark: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
	system: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
};

function getStoredTheme() {
	try {
		return localStorage.getItem(STORAGE_KEY) || 'system';
	} catch {
		return 'system';
	}
}

function applyTheme(theme) {
	const root = document.documentElement;
	if (theme === 'system') {
		root.removeAttribute('data-theme');
	} else {
		root.setAttribute('data-theme', theme);
	}
}

function getNextTheme(current) {
	const idx = THEMES.indexOf(current);
	return THEMES[(idx + 1) % THEMES.length];
}

function updateButton(btn, currentTheme) {
	const next = getNextTheme(currentTheme);
	btn.setAttribute('aria-label', `Switch to ${next} mode`);
	btn.innerHTML = ICONS[currentTheme];
}

const btn = document.getElementById('theme-toggle');
if (btn) {
	let current = getStoredTheme();
	applyTheme(current);
	updateButton(btn, current);

	btn.addEventListener('click', () => {
		current = getNextTheme(current);
		try {
			if (current === 'system') {
				localStorage.removeItem(STORAGE_KEY);
			} else {
				localStorage.setItem(STORAGE_KEY, current);
			}
		} catch {
			// localStorage may be unavailable in some contexts
		}
		applyTheme(current);
		updateButton(btn, current);
	});
}
