import { Juror } from "@/app/(admin)/dashboard/jurors/components/Juror";

export interface GetJurorsReponse {
  payload: Juror[];
  message: string;
  total: number;
  page: number;
  lastPage: number;
}

export interface DeleteJuror {
  message: string;
}

export interface CreateJuror {
  message: string;
  payload: Juror;
}

export interface UpdateJuror {
  message: string;
  payload: Juror;
}
