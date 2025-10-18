import z from "zod";

import { useMutation } from "@tanstack/react-query";
import { apiInstance } from "@/shared/api/apiInstance";
import { getQueryClient } from "@/shared/api/queryClient";
import { User } from "@/entities/Users";
import { userSchema, TUserSchema } from "../lib/schema";

const createUserURL = "/users";

const createUser = (data: TUserSchema): Promise<User> => {
  const isValid = z.parse(userSchema, data);

  if (!isValid) throw new Error("Неверный тип данных");

  return apiInstance.post<User, User>(createUserURL, data);
};

export const useCreateUser = () => {
  const queryClient = getQueryClient();
  return useMutation({
    mutationKey: ["createUser"],
    mutationFn: createUser,
    onSettled: () => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) && query.queryKey[0] === "users",
      });
    },
  });
};
