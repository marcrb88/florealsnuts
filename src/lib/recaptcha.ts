const RECAPTCHA_SITE_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

export const loadRecaptchaScript = () => {
  if (document.getElementById('recaptcha-script')) {
    return;
  }

  const script = document.createElement('script');
  script.id = 'recaptcha-script';
  script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
  document.head.appendChild(script);
};

export const getRecaptchaToken = async (): Promise<string> => {
  if (typeof window === 'undefined' || !window.grecaptcha) {
    throw new Error('reCAPTCHA not loaded');
  }

  try {
    const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, {
      action: 'contact_form',
    });
    return token;
  } catch (error) {
    console.error('Error getting reCAPTCHA token:', error);
    throw error;
  }
};

declare global {
  interface Window {
    grecaptcha: {
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export { RECAPTCHA_SITE_KEY };
