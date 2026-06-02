import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdateUser } = useMutation({
    mutationFn: updateCurrentUser,

    onSuccess: ({ user }) => {
      queryClient.setQueryData(["user"], user);
      
      toast.success("Account successfully updated");

      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },

    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isUpdateUser };
}
