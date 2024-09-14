import styled, { css } from "styled-components";
import { useSearchParams } from "react-router-dom";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

/*  We will implement this Filter feature by  storing the value by which the table be filtered in the URL again . Because this way the URL is  easily shareable and bookmarkable
  Now this means that the component  where we select these values is where we will update the URL state  and since we can read the state  from everywhere in the app , the filter
  component doesn't have to be close  to the cabin table . So it can be really anywhere that we want in the component tree . So again if we are using the useState() hook to store 
  the value by which the value should be filtered then this table would be a child component to the component that owns the state . But here we are storing the state in the URL
  then the filter component can be really anywhere that we want  */

function Filter({ filterField, options }) {
  // To store the value in the URL , We are using the useSearchParams() custom hook.
  const [searchParams, setSearchParams] = useSearchParams(); // This useSearchParams()  hook is also similar to the useState()  hook because it also gives us basically the state . So the SearchParams themselves
  //and then as a second value it gives us a way to update them.

  const currentFilter = searchParams.get(filterField) || options.at(0).value; // If the filterField doesn't exist then we will take the default value as options.at(0).value
  // stored in the currentFilter

  function handleClick(value) {
    // Here we will receive the value to this handleClick callback function that we want to set it in the URL
    // In the useSearchParams() hooks the first thing we have to do is , We have to set the state on searchParams itself
    searchParams.set(filterField, value); // Here in this set() function , the first argument should be the name of the state in the URL where we are calling it as discount and the second argument
    // is the value itself which we are receiving in the handleClick(value) function , This value can be the discount set to "all" (or) "no-discount" (or) "with-discount"
    setSearchParams(searchParams); // We are passing the above searchParams that are set to the setSearchParams() function
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          onClick={() => handleClick(option.value)}
          active={option.value === currentFilter}
          disabled={option.value === currentFilter}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
