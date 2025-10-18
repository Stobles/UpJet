import { queryOptions, useQuery } from "@tanstack/react-query";
import { User } from "../types";
import { apiInstance } from "@/shared/api/apiInstance";

const getUsersURL = "/users";

const getUsers = async (): Promise<User[]> => {
  return apiInstance.get<User, User[]>(getUsersURL);
};

export const getUsersQueryOptions = () => {
  return queryOptions({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });
};

export const useGetUsers = () => {
  return useQuery(getUsersQueryOptions());
};
