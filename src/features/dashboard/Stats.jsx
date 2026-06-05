import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  //1.
  const numBookings = bookings.length;
  //2
  const sales = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);
  //3
  const numCheckIns = confirmedStays.length;

  // 4
  const occupancy =
    confirmedStays.reduce((acc, stay) => acc + stay.numNights, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        title="Booking"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={sales}
      />
      <Stat
        title="check in"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={numCheckIns}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupancy * 100) + "%"}
      />
    </>
  );
}

export default Stats;
