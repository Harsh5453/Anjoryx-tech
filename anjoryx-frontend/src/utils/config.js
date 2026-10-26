// Central, single source of truth for environment-driven configuration.
// Never hardcode secrets here — only public, non-sensitive values.

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'anjoryx.tech@gmail.com';

export const SOCIAL_LINKS = {
  whatsapp: import.meta.env.VITE_WHATSAPP_URL || '', // e.g. https://wa.me/91XXXXXXXXXX
  linkedin: import.meta.env.VITE_LINKEDIN_URL || '',
  github: import.meta.env.VITE_GITHUB_URL || 'https://github.com/Harsh5453',
};

// Placeholder — wire up real GA/GTM once an ID is available.
export const ANALYTICS_ID = import.meta.env.VITE_GA_ID || '';
