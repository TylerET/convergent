import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import { ChakraProvider, Container } from "@chakra-ui/react";
import HeaderNavigation from "./components/HeaderNavigation/HeaderNavigation";
import EventDetails from "./pages/EventDetails/EventDetails";
import { CustomerProvider } from "./contexts/CustomerContext/CustomerContext";
import SearchResults from "./pages/SearchResults/SearchResults";
import EventsPage from "./pages/Events/EventsPage";
import MyEvents from "./pages/MyEvents/MyEvents";
import HostEvent from "./pages/HostEvent/HostEvent";
import ManageEvents from "./pages/ManageEvents/ManageEvents";
import { Auth0Provider } from "@auth0/auth0-react";

function App() {
  const domain = process.env.REACT_APP_AUTH_ISSUER_BASE_URL;
  const clientId = process.env.REACT_APP_AUTH_CLIENT_ID;

  return (
    <ChakraProvider>
      <Auth0Provider
        domain={domain as string}
        clientId={clientId as string}
        authorizationParams={{
          redirect_uri: `${window.location.origin}/convergent/`,
        }}
        useRefreshTokens={true}
        cacheLocation="localstorage"
      >
        <CustomerProvider>
          <HeaderNavigation />
          <Container maxW="container.xl" mt={4}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/events/details/:eventId"
                element={<EventDetails />}
              />
              <Route path="/events/search" element={<SearchResults />} />
              <Route path="/events/host" element={<HostEvent />} />
              <Route path="/events/host/manage" element={<ManageEvents />} />
              <Route path="/events/" element={<EventsPage />} />
              <Route path="/my-events/" element={<MyEvents />} />
            </Routes>
          </Container>
        </CustomerProvider>
      </Auth0Provider>
    </ChakraProvider>
  );
}

export default App;
