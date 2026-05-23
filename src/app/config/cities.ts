export interface CityConfig {
  code: string;
  name: string;
  country: string;
  timezone: string;
  utcOffset: string;
  flagCode: string;
}

export const CITIES: Record<string, CityConfig> = {
  TH: {
    code: 'TH',
    name: 'Bangkok',
    country: 'Thailand',
    timezone: 'Asia/Bangkok',
    utcOffset: 'UTC+7',
    flagCode: 'th',
  },
  US: {
    code: 'US',
    name: 'New York',
    country: 'USA',
    timezone: 'America/New_York',
    utcOffset: 'UTC-5',
    flagCode: 'us',
  },
  UK: {
    code: 'UK',
    name: 'London',
    country: 'United Kingdom',
    timezone: 'Europe/London',
    utcOffset: 'UTC+0',
    flagCode: 'gb',
  },
  JP: {
    code: 'JP',
    name: 'Tokyo',
    country: 'Japan',
    timezone: 'Asia/Tokyo',
    utcOffset: 'UTC+9',
    flagCode: 'jp',
  },
  CN: {
    code: 'CN',
    name: 'Shanghai',
    country: 'China',
    timezone: 'Asia/Shanghai',
    utcOffset: 'UTC+8',
    flagCode: 'cn',
  },
  SG: {
    code: 'SG',
    name: 'Singapore',
    country: 'Singapore',
    timezone: 'Asia/Singapore',
    utcOffset: 'UTC+8',
    flagCode: 'sg',
  },
  AU: {
    code: 'AU',
    name: 'Sydney',
    country: 'Australia',
    timezone: 'Australia/Sydney',
    utcOffset: 'UTC+10',
    flagCode: 'au',
  },
  DE: {
    code: 'DE',
    name: 'Berlin',
    country: 'Germany',
    timezone: 'Europe/Berlin',
    utcOffset: 'UTC+1',
    flagCode: 'de',
  },
  FR: {
    code: 'FR',
    name: 'Paris',
    country: 'France',
    timezone: 'Europe/Paris',
    utcOffset: 'UTC+1',
    flagCode: 'fr',
  },
  AE: {
    code: 'AE',
    name: 'Dubai',
    country: 'UAE',
    timezone: 'Asia/Dubai',
    utcOffset: 'UTC+4',
    flagCode: 'ae',
  },
};
