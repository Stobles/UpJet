import z from "zod";

import { useMutation } from "@tanstack/react-query";
import { apiInstance } from "@/shared/api/apiInstance";
import { getQueryClient } from "@/shared/api/queryClient";
import { getUsersQueryOptions } from "@/entities/Users/api/queries";
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
    onMutate: async (user, context) => {
      await context.client.cancelQueries({
        queryKey: getUsersQueryOptions().queryKey,
      });

      const previousUsers = context.client.getQueryData(
        getUsersQueryOptions().queryKey
      );

      // Генерация рандомного id приведет к ремаунту компонента во время ререндера таблицы с данными с сервера
      context.client.setQueryData(getUsersQueryOptions().queryKey, (old) =>
        old ? [...old, { id: crypto.randomUUID(), ...user }] : []
      );

      return { previousUsers };
    },
    onError: (_, __, onMutateResult, context) => {
      context.client.setQueryData(
        getUsersQueryOptions().queryKey,
        onMutateResult?.previousUsers
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(getUsersQueryOptions());
    },
  });
};
