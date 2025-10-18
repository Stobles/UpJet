import { env } from "@/shared/config/env";
import axios, { AxiosError, AxiosInstance } from "axios";

export const apiInstance: AxiosInstance = axios.create({
  baseURL: `${env.API_URL}`,
  timeout: 10000,

  headers: {
    "Content-Type": "application/json",
  },
});

export const responseErrorInterceptor = (error: AxiosError) => {
  if (error.message === "canceled") return;

  const method = error.config?.method?.toUpperCase();
  const url = error.config?.url;

  console.groupCollapsed(
    `%c[Axios Error] ${method || ""} ${url || ""}`,
    "color: #f87171; font-weight: bold;"
  );

  if (error.response) {
    const { status, statusText, data, headers } = error.response;

    console.error("📡 Сервер вернул ошибку:");
    console.log(
      `%cHTTP статус: %c${status} ${statusText || ""}`,
      "color: #999;",
      "color: #f87171; font-weight: bold;"
    );
    console.log(
      `%cURL запроса: %c${url}`,
      "color: #999;",
      "color: #fff; font-weight: bold;"
    );
    console.log(
      `%cМетод: %c${method}`,
      "color: #999;",
      "color: #fff; font-weight: bold;"
    );

    const message =
      data && typeof data === "object" && "message" in data
        ? data.message
        : null;

    if (message) {
      console.log(
        `%cСообщение: %c${message}`,
        "color: #999;",
        "color: #ffb86c;"
      );
    }

    console.debug("🧾 Полный ответ сервера:", data);
    console.debug("📨 Заголовки ответа:", headers);
  } else if (error.request) {
    console.error("🚫 Запрос был отправлен, но ответ не получен.");
    console.debug("🛰️ Объект запроса:", error.request);
  } else {
    console.error("❗ Произошла ошибка при настройке запроса:", error.message);
  }

  console.groupEnd();

  return Promise.reject(error);
};

apiInstance.interceptors.response.use(
  (config) => config.data,
  responseErrorInterceptor
);

export type BodyType<Data> = Data;
export type ErrorType<Error> = AxiosError<Error>;
