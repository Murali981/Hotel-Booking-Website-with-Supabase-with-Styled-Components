import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            {/* The index prop says that when the page loads initially it
            is automatically redirected to the dashboard page */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="cabins" element={<Cabins />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
            <Route path="account" element={<Account />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;

// import styled from "styled-components";
// import GlobalStyles from "./styles/GlobalStyles";
// import Button from "./ui/Button";
// import Input from "./ui/Input";
// import Heading from "./ui/Heading";
// import Row from "./ui/Row";

// const StyledApp = styled.div`
//   /* background-color: orangered; */
//   padding: 20px;
// `;

// function App() {
//   return (
//     <>
//       <GlobalStyles />
//       <StyledApp>
//         <Row>
//           <Row type="horizontal">
//             <Heading as="h1">The Wild Oasis</Heading>
//             <div>
//               <Heading as="h2">Check in and out</Heading>
//               <Button onClick={() => alert("Checked in..")}>Check In</Button>
//               <Button
//                 variation="secondary"
//                 size="small"
//                 onClick={() => alert("Checked out..")}
//               >
//                 Check Out
//               </Button>
//             </div>
//           </Row>
//           <Row>
//             <Heading as="h3">Form</Heading>
//             <form>
//               <Input type="number" placeholder="Number of guests" />
//               <Input type="number" placeholder="Number of guests" />
//             </form>
//           </Row>
//         </Row>
//       </StyledApp>
//     </>
//   );
// }

// export default App;
