import { env } from "@/shared/config/env";
import axios, { AxiosError, AxiosInstance } from "axios";

export const apiInstance: AxiosInstance = axios.create({
  baseURL: `${env.API_URL}/api`,
  timeout: 10000,

  headers: {
    "Content-Type": "application/json",
  },
});

export const responseErrorInterceptor = (error: AxiosError) => {
  if (error.message === "canceled") return;

  if (error.response) {
    console.error(
      'Ответ сервера - "Ошибка":',
      error.response.status,
      error.response.data
    );
  } else if (error.request) {
    console.error("Ошибка при выполнении запроса:", error.request);
  } else {
    console.error("Произошла ошибка:", error.message);
  }
  return Promise.reject(error);
};

apiInstance.interceptors.response.use(
  (config) => config,
  responseErrorInterceptor
);

export type BodyType<Data> = Data;
export type ErrorType<Error> = AxiosError<Error>;
