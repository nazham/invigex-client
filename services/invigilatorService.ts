import apiClient from "./axiosInstance";
import { Centre } from "./centreService";

export interface Invigilator {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  examCenterID: Pick<Centre, "_id">;
  __v?: number;
}

export const getInvigilators = async (): Promise<Invigilator[]> => {
  const response = await apiClient.get("/invigilator");
  return response.data;
};

export const getInvigilatorById = async (id: string): Promise<Invigilator> => {
  const response = await apiClient.get(`/invigilator/${id}`);
  return response.data;
};