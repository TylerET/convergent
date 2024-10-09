import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import { ChakraProvider, Container } from "@chakra-ui/react";
import HeaderNavigation from "./components/HeaderNavigation/HeaderNavigation";
import EventDetails from "./pages/EventDetails/EventDetails";

function App() {
  return (
    <ChakraProvider>
      <HeaderNavigation />
      <Container maxW="container.xl" mt={4}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/event/details/:eventId" element={<EventDetails />} />
        </Routes>
      </Container>
    </ChakraProvider>
  );
}

export default App;
