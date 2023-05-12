import { configureStore } from '@reduxjs/toolkit';

import artistsSlice from '@store/slices/artistsSlice';
import authSlice from '@store/slices/authSlice';
import authArtistsSlice from '@store/slices/authArtistsSlice';

const store = configureStore({
  reducer: {
    artistsSlice,
    authSlice,
    authArtistsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
