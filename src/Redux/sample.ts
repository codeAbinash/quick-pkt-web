import { configureStore } from '@reduxjs/toolkit';

import namesSlice from './names';

const store = configureStore({
   reducer: {
      names: namesSlice,
   },
});

export default store;
