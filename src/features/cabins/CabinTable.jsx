import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) {
    return <Spinner />;
  }

  if (!cabins.length) {
    return <Empty resourceName="cabins" />;
  }

  // 1) FILTER
  const filterValue = searchParams.get("discount") || "all"; // When the user first time accessed the "/cabins" page then it will be null by default but we want to show all the
  // cabins , So that's why we are setting it to "all" if  the filterValue is null when the user first time accessed our "/cabins" page
  // console.log(filterValue);

  let filteredCabins;

  if (filterValue === "all") {
    filteredCabins = cabins;
  }
  if (filterValue === "no-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  }
  if (filterValue === "with-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  }

  // 2) SORT
  const sortBy = searchParams.get("sortBy") || "startDate-asc";

  const [field, direction] = sortBy.split("-");
  console.log(field, direction);
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );
  console.log(modifier, sortedCabins);

  return (
    // If you observe in the below we are wrapping everything inside  <Menus> component
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        {/* In the above <Table> component we are passing columns as props */}
        {/* We are passing columns here in one central place */}
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          // // data={cabins}
          // data={filteredCabins}
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
        {/* In the above the <Table.Body /> self closing component where we are passing the cabins into the data props as well as ,
          We have to pass in  basically the instructions on how this <Table.Body> should actually render the data and here where the render props pattern comes into play.
          Again reiterating we are passing the data into this <Table.Body>  but it really doesn't know what to do with this cabins data , And it might know that the 
          passed cabins data is an array and so it will probably loop over that array but then it doesn't know what to do with it , So we are specifying the render prop
          to tell what to do with the cabins data. So in the render prop if you observe we are saying that iterate over every cabin and render every cabin into the 
          <CabinRow /> component  */}
      </Table>
    </Menus>
  );
}

export default CabinTable;
