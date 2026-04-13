/**
 * i18n.js — Language switcher module
 * Supports EN (English) and SW (Kiswahili)
 * Persists selection to localStorage
 */

const I18n = (() => {
  const STORAGE_KEY = 'wks_lang';
  const DEFAULT_LANG = 'en';
  let currentLang = DEFAULT_LANG;
  let strings = {};

  /**
   * Fetch and parse a language JSON file
   */
  async function loadStrings(lang) {
    const url = `lang/${lang}.json`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to load language file: ${url}`);
    return response.json();
  }

  /**
   * Apply loaded strings to all [data-i18n] elements
   */
  function applyStrings() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (strings[key] !== undefined) {
        // Use innerHTML to support &amp; etc. in values
        el.innerHTML = strings[key];
      }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (strings[key] !== undefined) {
        el.placeholder = strings[key];
      }
    });

    // Update lang attribute on <html>
    document.documentElement.lang = currentLang === 'sw' ? 'sw' : 'en';

    // Update active state on all lang toggle buttons
    document.querySelectorAll('[data-lang-btn]').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang-btn') === currentLang);
    });
  }

  /**
   * Switch to a given language
   */
  async function setLang(lang) {
    if (lang !== 'en' && lang !== 'sw') return;
    try {
      strings = await loadStrings(lang);
      currentLang = lang;
      localStorage.setItem(STORAGE_KEY, lang);
      applyStrings();
    } catch (err) {
      console.warn('i18n: could not load language strings.', err);
    }
  }

  /**
   * Initialise — reads stored preference, then loads and applies
   */
  async function init() {
    const stored = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
    await setLang(stored);

    // Wire up all language buttons (desktop + mobile)
    document.querySelectorAll('[data-lang-btn]').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang-btn');
        setLang(lang);
      });
    });
  }

  return { init, setLang, getLang: () => currentLang };
})();

// Auto-initialise when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', I18n.init);
} else {
  I18n.init();
}
