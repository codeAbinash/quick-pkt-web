import { configureStore } from '@reduxjs/toolkit';

import bannerSlice from './banners';
import featuredSlice from './featured';
import namesSlice from './names';
import profileSlice from './profile';
import settings from './settings';
import spotlightsSlice from './spotlights';

const store = configureStore({
  reducer: {
    names: namesSlice,
    banners: bannerSlice,
    spotlights: spotlightsSlice,
    featured: featuredSlice,
    profile: profileSlice,
    settings,
  },
});

export default store;
