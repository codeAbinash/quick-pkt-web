import { configureStore } from '@reduxjs/toolkit';

import namesSlice from './names';
import bannerSlice from './banners';
import spotlightsSlice from './spotlights';
import featuredSlice from './featured';

const store = configureStore({
  reducer: {
    names: namesSlice,
    banners: bannerSlice,
    spotlights: spotlightsSlice,
    featured: featuredSlice,
  },
});

export default store;
