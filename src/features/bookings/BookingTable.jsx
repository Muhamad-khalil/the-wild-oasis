import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import useBookings from "./useBookings";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import { useSearchParams } from "react-router-dom";

function BookingTable() {
  const { isLoading, bookings } = useBookings();
  // const [searchParam] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!bookings.length) return <Empty />;

  //0) Filter
  // const filterValue = searchParam.get("status") || "all";

  // let filterBooking;

  // if (filterValue === "all") filterBooking = bookings;
  // if (filterValue === "checked-out")
  //   filterBooking = bookings.filter(
  //     (booking) => booking.status === "checked-out",
  //   );
  // if (filterValue === "checked-in")
  //   filterBooking = bookings.filter(
  //     (booking) => booking.status === "checked-in",
  //   );
  // if (filterValue === "unconfirmed")
  //   filterBooking = bookings.filter(
  //     (booking) => booking.status === "unconfirmed",
  //   );

  // // 1) Sort
  // const sortBy = searchParam.get("sortBy") || "startDate-desc";
  // const [field, direction] = sortBy.split("-");
  // const modifier = direction === "asc" ? 1 : -1;
  // const sortedBookings = filterBooking.sort((a, b) => {
  //   if (field === "startDate") {
  //     return (new Date(a.startDate) - new Date(b.startDate)) * modifier;
  //   }
  //   return (a[field] - b[field]) * modifier;
  // });

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default BookingTable;
