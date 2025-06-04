import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: { "Content-Type": "application/json" },
});

// Error handling with interceptors
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.message || error.message || "An unknown error occurred";
        return Promise.reject(new Error(message));
    }
);

export default apiClient;