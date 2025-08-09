export type BlogType = {
  _id?: string; // optional if you don't always have it in memory
  title: string;
  thumbnail: {
    public_id: string;
    secure_url: string;
  };
  body: string;
  category: Category;
  writtenBy: Writer;
  video?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Category = {
  name: string;
  slug: string;
  _id: string;
  blogs: number;
  createdAt: string;
};

export type Writer = {
  name: string;
  email: string;
  profilePicture: { public_id: string; secure_url: string };
  _id: string;
  createdAt: string;
};

export interface GetCategories {
  message: string;
  payload: Category[];
  total: number;
  page: number;
  lastPage: number;
}

export interface CreateCategory {}

export interface PaginatedResponse<T> {
  message: string;
  payload: T;
  page: number;
  total: number;
  lastPage: number;
}

export interface SingleResponse<T> {
  message: string;
  payload: T;
}

export interface MessageResponse {
  message: string;
}

// Blog
export type GetBlogsResponse = PaginatedResponse<BlogType[]>;
export type GetBlogResponse = PaginatedResponse<BlogType>;
export type CreateBlogResponse = SingleResponse<BlogType>;
export type UpdateBlogResponse = SingleResponse<BlogType>;
export type DeleteBlogResponse = MessageResponse;

// Category
export type GetCategoriesResponse = PaginatedResponse<Category[]>;
export type GetCategoryResponse = PaginatedResponse<Category>;
export type CreateCategoryResponse = SingleResponse<Category>;
export type UpdateCategoryResponse = SingleResponse<Category>;
export type DeleteCategoryResponse = MessageResponse;

export type GetWritersResposne = PaginatedResponse<Writer[]>;
export type GetWriterResponse = PaginatedResponse<Writer>;
export type CreateWriterResponse = SingleResponse<Writer>;
export type UpdateWriterResponse = SingleResponse<Writer>;
export type DeleteWriterResponse = MessageResponse;
