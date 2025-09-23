/**
 * RTL (Right-to-Left) language utilities for Arabic language support
 */

// List of RTL language codes
const RTL_LANGUAGES = ['ar', 'ar-AE', 'ar-SA', 'he', 'fa', 'ur'];

/**
 * Check if a language code is RTL
 * @param language - Language code (e.g., 'ar-AE', 'en')
 * @returns boolean - true if RTL language
 */
export function isRTLLanguage(language: string): boolean {
  if (!language) return false;

  // Check exact match first
  if (RTL_LANGUAGES.includes(language)) return true;

  // Check language prefix (e.g., 'ar-AE' -> 'ar')
  const languagePrefix = language.split('-')[0];
  return RTL_LANGUAGES.includes(languagePrefix);
}

/**
 * Get direction attribute value for HTML
 * @param language - Language code
 * @returns 'rtl' | 'ltr'
 */
export function getDirectionFromLanguage(language: string): 'rtl' | 'ltr' {
  return isRTLLanguage(language) ? 'rtl' : 'ltr';
}

/**
 * Apply RTL direction to document
 * @param language - Language code
 */
export function applyRTLDirection(language: string): void {
  if (typeof document !== 'undefined') {
    const direction = getDirectionFromLanguage(language);
    document.documentElement.setAttribute('dir', direction);
    document.documentElement.setAttribute('lang', language);
  }
}

/**
 * Get text alignment for language
 * @param language - Language code
 * @returns 'right' | 'left'
 */
export function getTextAlignment(language: string): 'right' | 'left' {
  return isRTLLanguage(language) ? 'right' : 'left';
}

/**
 * Get flex direction for language
 * @param language - Language code
 * @returns 'row-reverse' | 'row'
 */
export function getFlexDirection(language: string): 'row-reverse' | 'row' {
  return isRTLLanguage(language) ? 'row-reverse' : 'row';
}
