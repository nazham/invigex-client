import apiClient from "./axiosInstance";

export interface Centre {
  _id: string;
  schoolName: string;
  examName: string;
  totalRooms: number;
  totalHalls: number;
  roomCapacity: number;
  hallCapacity: number;
  __v?: number;
}

export interface CreateCentreInput {
  schoolName: string;
  examName: string;
  totalRooms: number;
  totalHalls: number;
  roomCapacity: number;
  hallCapacity: number;
}

export const getCentres = async (): Promise<Centre[]> => {
  const response = await apiClient.get("/exam-centre");
  return response.data;
};

export const getCentreById = async (id: string): Promise<Centre> => {
  const response = await apiClient.get(`/exam-centre/${id}`);
  return response.data;
};

export const createCentre = async (data: CreateCentreInput): Promise<Centre> => {
  const response = await apiClient.post("/exam-centre", data);
  return response.data;
};

export const updateCentre = async (id: string, data: Partial<CreateCentreInput>): Promise<Centre> => {
  const response = await apiClient.put(`/exam-centre/${id}`, data);
  return response.data;
};

export const deleteCentre = async (id: string): Promise<void> => {
  await apiClient.delete(`/exam-centre/${id}`);
};