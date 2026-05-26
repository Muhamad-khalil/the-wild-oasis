import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckOut() {
  const queryClint = useQueryClient();
  const { mutate: checkOut, isLoading: isCheckOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`booking #${data.id} successfully Checked Out`);
      queryClint.invalidateQueries({ active: true });
    },
    onError: () => toast.error("there was an error while checking Out"),
  });

  return { checkOut, isCheckOut };
}
