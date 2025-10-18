import z from "zod";

import { useMutation } from "@tanstack/react-query";
import { apiInstance } from "@/shared/api/apiInstance";
import queryClient from "@/shared/api/queryClient";
import { getUsersQueryOptions } from "@/entities/Users/api/queries";
import { User } from "@/entities/Users";
import { userSchema, TUserSchema } from "../lib/schema";

const updateUserURL = "/users/{id}";

const updateUser = ({
  id,
  data,
}: {
  id: string;
  data: TUserSchema;
}): Promise<User> => {
  const isValid = z.parse(userSchema, data);

  if (!isValid) throw new Error("Неверный тип данных");

  return apiInstance.put<User, User>(updateUserURL.replace("{id}", id), data);
};

export const useUpdateUser = () => {
  return useMutation({
    mutationKey: ["updateUser"],
    mutationFn: updateUser,
    onMutate: async ({ id, data }, context) => {
      await context.client.cancelQueries({
        queryKey: getUsersQueryOptions().queryKey,
      });

      const previousUsers = context.client.getQueryData(
        getUsersQueryOptions().queryKey
      );

      context.client.setQueryData(getUsersQueryOptions().queryKey, (old) =>
        old
          ? old.map((item) => {
              if (item.id === id) return { id, ...data };
              return item;
            })
          : []
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
