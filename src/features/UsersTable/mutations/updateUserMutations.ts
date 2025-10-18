import z from "zod";

import { useMutation } from "@tanstack/react-query";
import { apiInstance } from "@/shared/api/apiInstance";
import { getQueryClient } from "@/shared/api/queryClient";
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
  const queryClient = getQueryClient();

  return useMutation({
    mutationKey: ["updateUser"],
    mutationFn: async ({ id, data }: { id: string; data: TUserSchema }) => {
      return updateUser({ id, data });
    },

    onMutate: async (variables) => {
      const { id, data } = variables;

      await queryClient.cancelQueries({
        predicate: (q) =>
          Array.isArray(q.queryKey) && q.queryKey[0] === "users",
      });

      const queries = queryClient.getQueriesData<User[]>({
        predicate: (query) =>
          Array.isArray(query.queryKey) && query.queryKey[0] === "users",
      });

      const previous = queries
        .filter(
          ([, data]) =>
            Array.isArray(data) && data.some((user) => user.id === id)
        )
        .map(([key, data]) => ({ key, data }));

      previous.forEach(({ key }) => {
        queryClient.setQueryData<User[]>(key, (old) =>
          old?.map((user) =>
            user.id === id ? { ...user, ...variables.data } : user
          )
        );
      });

      return { previous };
    },

    onError: (_, __, context) => {
      const prev = context?.previous;
      if (!prev) return;

      prev.forEach(({ key, data }) => {
        queryClient.setQueryData(key, data);
      });
    },

    onSuccess: (serverUser) => {
      const queries = queryClient.getQueriesData<User[]>({
        predicate: (query) =>
          Array.isArray(query.queryKey) && query.queryKey[0] === "users",
      });

      queries.forEach(([key, data]) => {
        const has =
          Array.isArray(data) && data.some((user) => user.id === serverUser.id);
        if (!has) return;

        queryClient.setQueryData<User[]>(key, (old) =>
          old?.map((user) => (user.id === serverUser.id ? serverUser : user))
        );
      });
    },
  });
};
