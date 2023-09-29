import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SpotlightType, getSpotlightsLs } from '../screens/Home/components/utils';

const initialState: SpotlightType[] | null = getSpotlightsLs();

const spotlightsSlice = createSlice({
  name: 'spotlights',
  initialState,
  reducers: {
    setSpotlights: (_, action: PayloadAction<SpotlightType[]>) => {
      return action.payload;
    },
  },
});

export const { setSpotlights } = spotlightsSlice.actions;

export default spotlightsSlice.reducer;
