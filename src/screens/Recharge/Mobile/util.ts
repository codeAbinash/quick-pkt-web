import { PlanType } from '../../../Redux/mobileRecharge';
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
  bsnl_topup: {
    background: '#fff500',
    text: '#000',
    name: 'BSNL Topup',
    icon: icons.providers.bsnl,
  },
  bsnl_special: {
    background: '#fff500',
    text: '#000',
    name: 'BSNL Special',
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

const airtelOperatorTypeMap = {
  '1': 'Full Talktime',
  '2': 'Top Up',
  '3': 'Data Pack',
  '4': 'Rate Cutter',
  '5': 'SMS Pack',
  '6': 'Combo Pack',
};

const bsnlOperatorTypeMap = {
  '1': 'Full Talktime',
  '2': 'Top Up',
  '3': 'Data Pack',
  '4': 'Rate Cutter',
  '5': 'SMS Pack',
  '6': 'Combo Pack',
  '7': 'SMS Pack',
};

const vodafoneOperatorTypeMap = {
  '1': 'Full Talktime',
  '2': 'Top Up',
  '3': 'Data Pack',
  '4': 'Rate Cutter',
  '5': 'SMS Pack',
};

const jioOperatorTypeMap = {
  '1': 'Full Talktime',
  '2': 'Top Up',
  '3': 'Data Pack',
  '4': 'Rate Cutter',
  '6': 'Roaming',
  '7': 'Jio Phone',
};

export const operatorTypeResponseMap: {
  [key: string]: {
    [key: string]: string;
  };
} = {
  airtel: airtelOperatorTypeMap,
  bsnl_topup: bsnlOperatorTypeMap,
  bsnl_special: bsnlOperatorTypeMap,
  vi: vodafoneOperatorTypeMap,
  jio: jioOperatorTypeMap,
};

export type OrganizedPlans = {
  [key: string]: PlanType[];
};
export function getOrganizedPlans(plans: PlanType[], provider: keyof typeof providerDetails): OrganizedPlans {
  const organizedPlans: any = {
    'All Plans': plans,
  };
  const otherPlans: PlanType[] = [];
  plans.forEach((plan) => {
    const planType = operatorTypeResponseMap[provider][plan.planid];
    if (planType) {
      if (organizedPlans[planType]) {
        organizedPlans[planType].push(plan);
      } else {
        organizedPlans[planType] = [plan];
      }
    } else {
      otherPlans.push(plan);
    }
  });
  if (otherPlans.length > 0) {
    organizedPlans['Other Plans'] = otherPlans;
  }
  return organizedPlans;
}
