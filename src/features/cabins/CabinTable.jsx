import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function CabinTable() {
  const { isLoading, cabins } = useCabins();

  if (isLoading) {
    return <Spinner />;
  }

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
          data={cabins}
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
