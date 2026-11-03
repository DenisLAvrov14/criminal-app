// Согласие на cookies: хранится в localStorage, изменения рассылаются событием,
// чтобы аналитика (GA, Clarity) могла включиться без перезагрузки страницы.

export type ConsentChoice = 'granted' | 'denied';

const STORAGE_KEY = 'cookie-consent';
export const CONSENT_EVENT = 'cookie-consent-change';
export const OPEN_SETTINGS_EVENT = 'cookie-consent-open';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function getConsent(): ConsentChoice | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch {
    return null;
  }
}

export function setConsent(choice: ConsentChoice) {
  try {
    localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // приватный режим — выбор действует до перезагрузки
  }
  // Google Consent Mode v2
  window.gtag?.('consent', 'update', {
    analytics_storage: choice,
    ad_storage: choice,
    ad_user_data: choice,
    ad_personalization: choice,
  });
  window.dispatchEvent(new CustomEvent<ConsentChoice>(CONSENT_EVENT, { detail: choice }));
}

export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}
