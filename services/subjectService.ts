import apiClient from "./axiosInstance";

export interface Subject {
  _id: string;
  subjectCode: string;
  name: string;
  examType: string;
  __v?: number;
}

export const getSubjects = async (): Promise<Subject[]> => {
  const response = await apiClient.get("/subject");
  return response.data;
};

export const getSubjectById = async (id: string): Promise<Subject> => {
  const response = await apiClient.get(`/subject/${id}`);
  return response.data;
};