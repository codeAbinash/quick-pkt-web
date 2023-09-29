import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FeaturedType, getFeaturedLs } from '../screens/Home/components/utils';

const initialState: FeaturedType[] | null = getFeaturedLs();

const featuredSlice = createSlice({
  name: 'featured',
  initialState,
  reducers: {
    setFeatured: (_, action: PayloadAction<FeaturedType[]>) => {
      return action.payload;
    },
  },
});

export const { setFeatured } = featuredSlice.actions;

export default featuredSlice.reducer;
