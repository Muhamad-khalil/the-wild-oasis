import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useCabins from "./useCabins";
import Table from "../../ui/Table";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const { isLoading, cabins = [] } = useCabins();

  const [searchParam] = useSearchParams();

  const filterValue = searchParam.get("discount") || "all";

  let filteredCabin;

  if (filterValue === "all") filteredCabin = cabins;

  if (filterValue === "no-discount")
    filteredCabin = cabins.filter((cabin) => cabin.discount === 0);

  if (filterValue === "with-discount")
    filteredCabin = cabins.filter((cabin) => cabin.discount > 0);

  if (isLoading) return <Spinner />;
  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header role="row">
        <div></div>
        <div>Cabins</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>
      <Table.Body
        // data={cabins}
        data={filteredCabin}
        render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
      />
    </Table>
  );
}

export default CabinTable;
