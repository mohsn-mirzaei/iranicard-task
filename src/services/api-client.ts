import axios, { AxiosRequestConfig } from "axios";
import { toast } from "sonner";

export interface FetchResponse<ResponseType> {
  data: ResponseType[];
}

interface ErrorResponse {
  status_code: number;
  message: string;
}

class APIClient<RequestType = any, ResponseType = any> {
  private axiosInstance;
  endpoint: string;

  constructor(endpoint: string, baseURL?: string) {
    this.endpoint = endpoint;
    this.axiosInstance = axios.create({
      baseURL: baseURL || process.env.NEXT_PUBLIC_API_URL, // Default to API URL if no baseURL is provided
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  get = async (config?: AxiosRequestConfig) => {
    try {
      const response = await this.axiosInstance.get<
        FetchResponse<ResponseType>
      >(this.endpoint, config);
      return response.data;
    } catch (error) {
      // this.handleError(error);
      throw error;
    }
  };

  post = async (data: RequestType, config?: AxiosRequestConfig) => {
    try {
      const response = await this.axiosInstance.post<
        FetchResponse<ResponseType>
      >(this.endpoint, data, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  };

  delete = async (id: string | number, config?: AxiosRequestConfig) => {
    try {
      const response = await this.axiosInstance.delete<
        FetchResponse<ResponseType>
      >(`${this.endpoint}/${id}`, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  };

  private handleError = (error: unknown) => {
    if (axios.isAxiosError<ErrorResponse>(error)) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred.";
      toast.error(errorMessage);
    } else {
      toast.error("An unexpected error occurred.");
    }
  };
}

export default APIClient;
