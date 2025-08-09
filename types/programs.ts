import { Juror } from "@/app/(admin)/dashboard/jurors/components/Juror";
import { Partner } from "./partners";
import { Project } from "./projects";

export interface Program {
  _id?: string;
  background: {
    public_id: string;
    secure_url: string;
  };
  name: string;
  headline: string;
  sub_headline: string;
  applying_link?: string;
  contact_link?: string;
  edition_target?: string;
  timeline?: string;
  eligibility?: string;
  main_awards?: string;
  selection_process?: string;
  selected_projects?: Project[]; // إذا كانت ID واحدة، غيره حسب الحاجة
  projects: Project[];
  jury: Juror[];
  awards_list: string[];
  partners: Partner[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ProgramsResponse {
  payload: Program[];
  message: string;
  total: number;
  page: number;
  lastPage: number;
}

export interface GetProgramResponse {
  message: string;
  payload: Program;
}

export interface CreateProgramResponse {
  message: string;
  payload: Program;
}

export interface UpdateProgramResponse {
  message: string;
  payload: Program;
}

export interface DeleteProgramResponse {
  message: string;
}
