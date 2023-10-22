import { createSlice } from '@reduxjs/toolkit';

const initialState: Alert = null;

export type Alert = {
  id: string;
  title: string;
  subtitle: string;
} | null;

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotification: (_, action) => {
      return action.payload;
    },
  },
});

export const { setNotification } = notificationsSlice.actions;

export default notificationsSlice.reducer;
