import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeletedBooking() {
  const queryClint = useQueryClient();

  const { mutate: deletedBooking, isLoading: isDeleteBooking } = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      toast.success(`booking successfully deleted`);
      queryClint.invalidateQueries({
        queryKey: "Bookings",
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { deletedBooking, isDeleteBooking };
}
