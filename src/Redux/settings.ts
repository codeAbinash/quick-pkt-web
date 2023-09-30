import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Theme, getCurrentThemeLs } from '../lib/theme';

const initialState = {
  theme: getCurrentThemeLs(),
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = settingsSlice.actions;

export default settingsSlice.reducer;
