import z from "zod";

import validator from "validator";
import { useMutation } from "@tanstack/react-query";
import { apiInstance } from "@/shared/api/apiInstance";
import queryClient from "@/shared/api/queryClient";
import { getUsersQueryOptions } from "@/entities/Users/api/queries";
import { User } from "@/entities/Users";

const createUserURL = "/users";

const createUser = (data: TCreateUser): Promise<User> => {
  const isValid = z.parse(createUserSchema, data);

  if (!isValid) throw new Error("Неверный тип данных");

  return apiInstance.post<User, User>(createUserURL, data);
};

export const useCreateUser = () => {
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

export const createUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Имя обязательно")
    .max(100, "Имя слишком длинное (макс 100 символа)"),

  email: z.email("Неверный формат email"),
  phone: z
    .string()
    .refine(validator.isMobilePhone, { error: "Неверный формат телефона" }),

  role: z.enum(["Admin", "User", "Manager"], {
    error: "Значение должно быть одним из списка: Admin, User, Manager",
  }),
});

export type TCreateUser = z.infer<typeof createUserSchema>;
