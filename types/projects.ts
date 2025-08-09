export interface Project {
  title: string;
  description: string;
  type: string;
  location: string;
  credits: string;
  cover_image: {
    public_id: string;
    secure_url: string;
  };
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProject {
  message: string;
  payload: Project;
}

export interface GetProjects {
  payload: Project[];
  message: string;
  total: number;
  lastPage: number;
  page: number;
}

export interface GetProject {
  payload: Project;
  message: string;
}

export interface UpdateProject {
  message: string;
  payload: Project;
}

export interface DeleteProject {
  message: string;
}
