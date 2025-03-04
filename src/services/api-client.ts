import axios, { AxiosRequestConfig } from "axios";

export interface FetchResponse<T> {
  data: T[];
}

class APIClient<T> {
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

  get = (config?: AxiosRequestConfig) => {
    return this.axiosInstance
      .get<FetchResponse<T>>(this.endpoint, config)
      .then((res) => res.data);
  };
}

export default APIClient;
