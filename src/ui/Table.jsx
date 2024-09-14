import { createContext, useContext } from "react";
import styled from "styled-components";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

/// In the below we are following the compound component pattern ///////////

// step 1) Creating the context
const TableContext = createContext();

function Table({ columns, children }) {
  // Here this Table recieves columns as props from the <Table> component that we have passed
  return (
    <TableContext.Provider value={{ columns }}>
      {/* In the above we are saying value={{columns}} which means we are passing the columns that we have received as props into the context such that
     the below Header and Row components can read from the context that we have created above. Reiterating agian all the child components can read the columns from the context 
      created by the parent component Table  */}
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext); // We can get the access to the columns through the useContext() hook from the parent component Table.

  return (
    //  In the below  we are passing the columns that we have read from the context and passing into the StyledHeader which is a styled component as props
    <StyledHeader role="row" columns={columns} as="header">
      {/* In the above as="header" makes (or) converts the <div> element into an <header> element */}
      {children}
    </StyledHeader>
  );
}

function Row({ children }) {
  const { columns } = useContext(TableContext); // We can get the access to the columns through the useContext() hook from the parent component Table.

  return (
    <StyledRow role="row" columns={columns}>
      {children}
    </StyledRow>
  );
}

function Body({ data, render }) {
  // We are accepting the data and render prop that has passed from the <Table.Body> component
  if (!data.length) {
    return <Empty>No data to show at this moment</Empty>;
  }

  return <StyledBody>{data.map(render)}</StyledBody>; // This <StyledBody> will add some padding to the interior , and in this we are taking the data that
  // we have received from props and map over it. And on each data , we are calling the render prop map(render)
}

Table.Header = Header;

Table.Body = Body;

Table.Row = Row;

Table.Footer = Footer;

export default Table;
