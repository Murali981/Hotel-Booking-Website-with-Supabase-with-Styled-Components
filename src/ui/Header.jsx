import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
`;

function Header() {
  return <StyledHeader>HEADER</StyledHeader>;
  // In the above styled header is assigned by the header element in the HTML where we are applying some styles to the header element and
  //  storing the styles into a StyledHeader , So we are wrapping the header content inside the <StyledHeader> to apply the styles.
}

export default Header;
