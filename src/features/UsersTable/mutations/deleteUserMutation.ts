import { getUsersQueryOptions } from "@/entities/Users/api/queries";
import { apiInstance } from "@/shared/api/apiInstance";
import { getQueryClient } from "@/shared/api/queryClient";
import { useMutation } from "@tanstack/react-query";

const deleteUserURL = "/users/{id}";

const deleteUser = (id: string) => {
  return apiInstance.delete(deleteUserURL.replace("{id}", id));
};

export const useDeleteUser = () => {
  const queryClient = getQueryClient();
  return useMutation({
    mutationKey: ["deleteUser"],
    mutationFn: deleteUser,
    onSettled: () => {
      queryClient.invalidateQueries({
        predicate: (q) =>
          Array.isArray(q.queryKey) && q.queryKey[0] === "users",
      });
    },
  });
};
