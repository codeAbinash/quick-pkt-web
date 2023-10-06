import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import ls from '../lib/util';
import store from './store';

export type PlanType = {
  amount: string;
  validity: string;
  description: string;
  planid: string;
};

export type AnyPlanObjWithKey = {
  [key in string]: PlanType[];
};

export type AnyLastUpdatedWithKey = {
  [key in string]: number;
};

export type MobileRechargeData = {
  lastUpdated: AnyLastUpdatedWithKey;
  plans: AnyPlanObjWithKey;
};

function getMobileRechargeLs(): MobileRechargeData {
  return JSON.parse(ls.get('mobileRechargePlans') || 'null');
}

export function setMobileRechargeLs(): void {
  const data = store.getState().mobileRecharge;
  ls.set('mobileRechargePlans', JSON.stringify(data));
}

const initialState: MobileRechargeData = getMobileRechargeLs() || {
  lastUpdated: {},
  plans: {},
};

const mobileRechargeSlice = createSlice({
  name: 'mobileRecharge',
  initialState,
  reducers: {
    setMobileRecharge: (state, action: PayloadAction<{ key: string; value: PlanType[] }>) => {
      console.log('Setting mobile recharge');
      state.plans[action.payload.key] = action.payload.value;
      state.lastUpdated[action.payload.key] = Date.now();
    },
    getMobileRecharge(state) {
      return state;
    },
  },
});
export const { setMobileRecharge } = mobileRechargeSlice.actions;
export default mobileRechargeSlice.reducer;
