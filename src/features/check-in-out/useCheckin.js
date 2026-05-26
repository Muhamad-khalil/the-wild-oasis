import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClint = useQueryClient();
  const navigate = useNavigate();
  const { mutate: ckeckIn, isLoading: isCheckIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`booking #${data.id} successfully Checked In`);
      queryClint.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: () => toast.error("there was an error while checking in"),
  });

  return { ckeckIn, isCheckIn };
}
