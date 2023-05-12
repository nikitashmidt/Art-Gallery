import type { ArtistsState } from './slices/artistsSlice';
import type { AuthState } from './slices/authSlice';
import type { AuthArtist } from './slices/authArtistsSlice';

export const artistsSelector = (state: { artistsSlice: ArtistsState }) =>
  state.artistsSlice;

export const authSelector = (state: { authSlice: AuthState }) =>
  state.authSlice;

export const authArtistsSelector = (state: { authArtistsSlice: AuthArtist }) =>
  state.authArtistsSlice;
