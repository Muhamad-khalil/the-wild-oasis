import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

function useBookings() {
  const [searchParam] = useSearchParams();

  // 1) filter
  const filterValue = searchParam.get("status") || "all";
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  // 2) sort
  const sortByRaw = searchParam.get("sortBy") || "startDate-desc";

  const [field, direction] = sortByRaw.split("-");

  const sortBy = {
    field,
    direction,
  };

  // 3) PAGINATION
  const page = !searchParam.get("page") ? 1 : Number(searchParam.get("page"));

  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["Bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });
  return { isLoading, bookings, error, count };
}

export default useBookings;
