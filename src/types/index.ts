export interface IArtist {
  genres: string[];
  _id: string;
  name: string;
  description: string;
  yearsOfLife: string;
  mainPainting: IPainting;
}

export interface IPainting {
  image: Image;
  name: string;
  yearOfCreation: string;
  _id: string;
}

export interface IGenre {
  _id: string;
  name: string;
}

export interface Image {
  src?: string;
  webp?: string;
  src2x?: string;
  webp2x?: string;
  original?: string;
}

export interface IOneArtist {
  genres: IGenre[];
  paintings: IPainting[];
  _id: string;
  name: string;
  yearsOfLife: string;
  description: string;
  mainPainting: IPainting;
  avatar: Image;
}

export interface IUser {
  email: string;
  password: string;
  fingerprint: string;
}

export interface IUserRequest {
  username: string;
  password: string;
  fingerprint: string;
}

export interface IUserResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IRefreshRequest {
  fingerprint: string;
  refreshToken: string;
}

export interface IResponseMainPainting {
  size: number;
  buffer: Record<string, never>;
  encoding: string;
  mimetype: string;
  fieldname: string;
  originalname: string;
}

export interface IRequestMainPainting {
  id: string;
  artistId: string;
}

export interface IFormData {
  email: string;
  password: string;
}

export interface IModalAdd {
  namePicture: string;
  yearCreation: number;
  picture: File;
}
