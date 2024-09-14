import styled from "styled-components";

const StyledSelect = styled.select`
  // Here this is just a select HTML element and storing it in StyledSelect style component
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

function Select({ options, value, onChange, ...props }) {
  // In the above , You can receive all the remaining props using the spread operator
  // In the below <StyledSelect> style-component we are passing the value={value} prop which is the currently active value just like we do on all controlled components.
  // In the end this will be a controlled component like we always been using.
  console.log(props); //{type:"white"} , This spread operator(...) you will receive all the remaining props
  return (
    // In the below <StyledSelect> component we are in a situation to receive multiple props(properties) then we have to pass these multiple props by entering into javascript mode
    // {} and then using the spread operator followed by props({...props}) . This is the same trick we have followed in the react hook form
    <StyledSelect value={value} onChange={onChange} {...props}>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;
