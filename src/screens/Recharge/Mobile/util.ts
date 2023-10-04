import ls from '../../../lib/util';

export const providerColors: {
  [key: string]: {
    background: string;
    text: string;
  };
} = {
  jio: {
    background: '#0a2885',
    text: '#fff',
  },
  airtel: {
    background: '#f60a0b',
    text: '#fff',
  },
  vi: {
    background: '#ee2e3e',
    text: '#fff',
  },
  bsnl: {
    background: '#fff500',
    text: '#000',
  },
};

export type Provider = {
  name: string;
  id: number;
  short_code: string;
};

export const getProviderLs = (): Provider[] => {
  const providers = JSON.parse(ls.get('providers') || 'null');
  return providers;
};

export const setProviderLs = (providers: Provider[]): void => {
  ls.set('providers', JSON.stringify(providers));
};
