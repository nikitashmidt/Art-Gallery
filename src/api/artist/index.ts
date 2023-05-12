import type { IArtist, IOneArtist } from '@types';
import instance from '..';

export const getArtists = async () => {
  const { data } = await instance.get<IArtist[]>('artists/static');
  return data;
};

export const getArtist = async (id: string) => {
  const { data } = await instance.get<IOneArtist>(`artists/static/${id}`);
  return data;
};
