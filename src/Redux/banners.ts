import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { BannerType, getBannersLs } from '../screens/Home/components/utils';

const initialState: BannerType[] | null = getBannersLs();

const bannerSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {
    setBanners: (_, action: PayloadAction<BannerType[]>) => {
      return action.payload;
    },
  },
});

export const { setBanners } = bannerSlice.actions;

export default bannerSlice.reducer;
