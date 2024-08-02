import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto; // This is the trick to place it in the center of the webpage
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Main>
        <Container>
          <Outlet />
          {/* The  outlet component here is used to tell that  AppLayout is the parent route and it's child routes are Dashboard
           , bookings , cabins , users etc..... what does this outlet component exactly helps us to do is whenver you got to the 
            route /bookings route then in this /bookings route , along with the content of bookings page it will display the 
             content of the AppLayout component as well because AppLayout is the parent for the bookings component. */}
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
