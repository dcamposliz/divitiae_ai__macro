/**
 * Country metadata for G7 + China + India
 * Per PRD Section 5.1 - Global Coverage
 */

export const COUNTRIES = {
  US: {
    code: 'US',
    name: 'United States',
    region: 'North America',
    flag: '🇺🇸',
    currency: 'USD',
  },
  CA: {
    code: 'CA',
    name: 'Canada',
    region: 'North America',
    flag: '🇨🇦',
    currency: 'CAD',
  },
  GB: {
    code: 'GB',
    name: 'United Kingdom',
    region: 'Europe',
    flag: '🇬🇧',
    currency: 'GBP',
  },
  DE: {
    code: 'DE',
    name: 'Germany',
    region: 'Europe',
    flag: '🇩🇪',
    currency: 'EUR',
  },
  FR: {
    code: 'FR',
    name: 'France',
    region: 'Europe',
    flag: '🇫🇷',
    currency: 'EUR',
  },
  IT: {
    code: 'IT',
    name: 'Italy',
    region: 'Europe',
    flag: '🇮🇹',
    currency: 'EUR',
  },
  JP: {
    code: 'JP',
    name: 'Japan',
    region: 'Asia',
    flag: '🇯🇵',
    currency: 'JPY',
  },
  CN: {
    code: 'CN',
    name: 'China',
    region: 'Asia',
    flag: '🇨🇳',
    currency: 'CNY',
  },
  IN: {
    code: 'IN',
    name: 'India',
    region: 'Asia',
    flag: '🇮🇳',
    currency: 'INR',
  },
};

export const COUNTRY_LIST = Object.values(COUNTRIES);

export const getCountry = (code) => COUNTRIES[code];
