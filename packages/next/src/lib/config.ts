// import { isFeatureEnabledNow, FeatureNames } from '@wf/models/features/enabledFeatures';

const config = () => {
  const apiUrl = process.browser ? process.env.NEXT_PUBLIC_API_URL || '/v1' : process.env.API_URL;
  const baseDomain = process.browser
    ? process.env.NEXT_PUBLIC_BASE_DOMAIN || 'textmill.com'
    : process.env.BASE_DOMAIN;
  return {
    API_URL: apiUrl,
    BASE_DOMAIN: baseDomain,
    isTest: process.env.ENV === 'test',
    isServer: typeof window === 'undefined',
    isBrowser: typeof window !== 'undefined',
    isDevelopment: process.env.NODE_ENV !== 'production',
    isProduction: process.env.NODE_ENV === 'production',
  };
};

export default config;
