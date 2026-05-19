import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinTableOperations() {
  const optionsFilter = [
    { value: "all", label: "All" },
    { value: "no-discount", label: "No Discount" },
    { value: "with-discount", label: "With Discount" },
  ];
  const optionsSort = [
    { value: "name-asc", label: "Sort By (A-Z)" },
    { value: "name-desc", label: "Sort By (Z-A)" },
    { value: "regularPrice-asc", label: "Sort By Price (low first)" },
    { value: "regularPrice-desc", label: "Sort By Price (high first)" },
    { value: "maxCapacity-asc", label: "Sort By Capacity (low first)" },
    { value: "maxCapacity-desc", label: "Sort By Capacity (high first)" },
  ];

  return (
    <TableOperations>
      <Filter filterField="discount" options={optionsFilter} />
      <SortBy options={optionsSort} />
    </TableOperations>
  );
}

export default CabinTableOperations;
