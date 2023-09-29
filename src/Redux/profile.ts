import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserProfile, getProfileInfoLs } from '../screens/Profile/utils';

const initialState: UserProfile = getProfileInfoLs();

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (_, action: PayloadAction<UserProfile>) => {
      return action.payload;
    },
  },
});

export const { setProfile } = profileSlice.actions;

export default profileSlice.reducer;
