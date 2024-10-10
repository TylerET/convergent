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

function App() {
  return (
    <ChakraProvider>
      <CustomerProvider>
        <HeaderNavigation />
        <Container maxW="container.xl" mt={4}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/events/details/:eventId" element={<EventDetails />} />
            <Route path="/events/search" element={<SearchResults />} />
            <Route path="/events/host" element={<HostEvent />} />
            <Route path="/events/host/manage" element={<ManageEvents />} />
            <Route path="/events/" element={<EventsPage />} />
            <Route path="/my-events/" element={<MyEvents />} />
          </Routes>
        </Container>
      </CustomerProvider>
    </ChakraProvider>
  );
}

export default App;
