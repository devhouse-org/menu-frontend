/**
 * Domain to Access Code Mapping
 * Maps restaurant domains to their access codes for automatic authentication
 */

export const RESTAURANT_DOMAIN_MAP: Record<string, string> = {
    'olive-qrcode.netlify.app': '112233',
    'sports-cafe-qrcode-menu.netlify.app': '123456',
    'indian-palace.netlify.app': '5421',
    'sallat-alasmak-qr.netlify.app': 'SAA',
    'melodie.cafe': 'HHH',
};

/**
 * Get access code based on current domain
 */
export const getAccessCodeFromDomain = (): string | null => {
    const hostname = window.location.hostname;
    return RESTAURANT_DOMAIN_MAP[hostname] || null;
};
