import icons from '../../../assets/icons/icons';
import ls from '../../../lib/util';

export const providerDetails: {
  [key: string]: {
    background: string;
    text: string;
    name: string;
    icon?: string;
  };
} = {
  jio: {
    background: '#0a2885',
    text: '#fff',
    name: 'Jio',
    icon: icons.providers.jio,
  },
  airtel: {
    background: '#f60a0b',
    text: '#fff',
    name: 'Airtel',
    icon: icons.providers.airtel,
  },
  vi: {
    background: '#ee2e3e',
    text: '#fff',
    name: 'V!',
    icon: icons.providers.vi,
  },
  bsnl: {
    background: '#fff500',
    text: '#000',
    name: 'BSNL',
    icon: icons.providers.bsnl,
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
