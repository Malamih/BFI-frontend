export interface GalleryImage {
  image: {
    public_id: string;
    secure_url: string;
    _id: string;
  };
}

export interface GetGallery {
  payload: GalleryImage[];
  message: string;
  total: number;
  page: number;
  lastPage: number;
}
