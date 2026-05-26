import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmedPaid, setConfirmedPaid] = useState(false);
  const [addBreakFast, setAddBreakFast] = useState(false);
  const { isLoading, booking } = useBooking();
  const moveBack = useMoveBack();

  const { ckeckIn, isCheckIn } = useCheckin();
  const { isLoading: isLoadingSetting, settings } = useSettings();

  useEffect(() => setConfirmedPaid(booking?.isPaid ?? false), [booking]);

  if (isLoading || isLoadingSetting) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakFastPrice =
    settings.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmedPaid) return;

    if (addBreakFast) {
      ckeckIn({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakFastPrice,
          totalPrice: totalPrice + optionalBreakFastPrice,
        },
      });
    } else {
      ckeckIn({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakFast}
            onChange={() => {
              setAddBreakFast((add) => !add);
            }}
            id="confirm-breakfast"
            disabled={isCheckIn}
          >
            Want to add a breakfast for {formatCurrency(optionalBreakFastPrice)}
            ?
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          checked={confirmedPaid}
          onChange={() => setConfirmedPaid((confirm) => !confirm)}
          id="confirm"
          disabled={confirmedPaid || isCheckIn}
        >
          I Confirmed that {guests.fullName} has Paid the total amount of{" "}
          {!addBreakFast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakFastPrice,
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakFastPrice,
              )})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmedPaid || isCheckIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
