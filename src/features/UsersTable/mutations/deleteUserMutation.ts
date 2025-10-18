import { getUsersQueryOptions } from "@/entities/Users/api/queries";
import { apiInstance } from "@/shared/api/apiInstance";
import queryClient from "@/shared/api/queryClient";
import { useMutation } from "@tanstack/react-query";

const deleteUserURL = "/users/{id}";

const deleteUser = (id: string) => {
  return apiInstance.delete(deleteUserURL.replace("{id}", id));
};

export const useDeleteUser = () => {
  return useMutation({
    mutationKey: ["deleteUser"],
    mutationFn: deleteUser,

    onMutate: async (id, context) => {
      await context.client.cancelQueries({
        queryKey: getUsersQueryOptions().queryKey,
      });

      const previousUsers = context.client.getQueryData(
        getUsersQueryOptions().queryKey
      );

      context.client.setQueryData(getUsersQueryOptions().queryKey, (old) =>
        old?.filter((item) => item.id != id)
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
