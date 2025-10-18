import {
  keepPreviousData,
  queryOptions,
  useQuery,
} from "@tanstack/react-query";
import { User } from "../types";
import { apiInstance } from "@/shared/api/apiInstance";
import { env } from "@/shared/config/env";

const getUsersURL = "/users";

export const getUsers = async ({
  page,
  limit,
}: {
  page?: number;
  limit?: number;
}): Promise<User[]> => {
  const fullUsersURL = new URL(`${env.API_URL}${getUsersURL}`);

  if (page) fullUsersURL.searchParams.append("page", `${page}`);
  if (limit) fullUsersURL.searchParams.append("limit", `${limit}`);

  const relativePath =
    fullUsersURL.pathname.split("v1")[1] + fullUsersURL.search;

  return apiInstance.get<User, User[]>(relativePath);
};

export const getUsersQueryOptions = ({
  page,
  limit,
}: {
  page?: number;
  limit?: number;
} = {}) => {
  const queryKey = ["users"];

  if (page) queryKey.push(`page ${page}`);
  if (limit) queryKey.push(`limit ${limit}`);
  return queryOptions({
    queryKey,
    queryFn: () => getUsers({ page, limit }),
  });
};

export const useGetUsers = ({
  page,
  limit,
}: {
  page?: number;
  limit?: number;
} = {}) => {
  return useQuery({
    ...getUsersQueryOptions({ page, limit }),
    placeholderData: keepPreviousData,
  });
};
