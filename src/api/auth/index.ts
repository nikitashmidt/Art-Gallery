import type {
  IRequestMainPainting,
  IResponseMainPainting,
  IArtist,
  IOneArtist,
} from '@types';
import instance from '..';

interface IGetArtist {
  data: IArtist[];
  meta: {
    count: number;
    perPage: number;
    pageNumber: number;
  };
}

export const pathChoiceMainPainting = async ({
  id,
  artistId,
}: IRequestMainPainting) => {
  const response = await instance.patch<IResponseMainPainting>(
    `artists/${artistId}/main-painting`,
    {
      mainPainting: id,
    }
  );

  return response.data;
};

export const getAuthArtist = async (id: string) => {
  const response = await instance.get<IOneArtist>(`artists/${id}`);
  return response.data;
};

export const getAuthArtists = async () => {
  const response = await instance.get<IGetArtist>(`artists`);
  return response.data.data;
};
