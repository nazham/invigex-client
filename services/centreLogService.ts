import apiClient from "./axiosInstance";
import { Centre } from "./centreService";

export interface CentreStatistics {
  subjectID: string;
  appliedStudentsCount: number;
  session: "AM" | "PM";
  _id?: string;
}

export interface CentreLog {
  _id: string;
  examDate: string;
  examCenterID: Centre;
  centreStatistics: CentreStatistics[];
  resourceAllocation: {
    roomsNeeded: number;
    hallsNeeded: number;
    invigilatorsNeeded: number;
    totalStudents: number;
  };
  __v?: number;
}

export interface CreateCentreLogInput {
  examDate: string;
  examCenterID: string;
  centreStatistics: CentreStatistics[];
}

export const getCentreLogs = async (examCenterID?: string): Promise<CentreLog[]> => {
  const response = await apiClient.get("/centre-log", {
    params: examCenterID ? { examCenterID } : {},
  });
  return response.data;
};

export const getCentreLogById = async (id: string): Promise<CentreLog> => {
  const response = await apiClient.get(`/centre-log/${id}`);
  return response.data;
};

export const createCentreLog = async (data: CreateCentreLogInput): Promise<CentreLog> => {
  const response = await apiClient.post("/centre-log", data);
  return response.data;
};

export const updateCentreLog = async (id: string, data: Partial<CreateCentreLogInput>): Promise<CentreLog> => {
  const response = await apiClient.put(`/centre-log/${id}`, data);
  return response.data;
};

export const deleteCentreLog = async (id: string): Promise<void> => {
  await apiClient.delete(`/centre-log/${id}`);
};