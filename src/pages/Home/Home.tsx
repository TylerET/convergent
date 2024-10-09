import { Button } from "@chakra-ui/react";
import React from "react";
import { GridContainer, StyledDiv } from "./Home.styles";
import mockEventData from "../../mocks/mockEvents";
import EventCard from "../../components/common/EventCard/EventCard";

function Home() {
  return (
    <StyledDiv>
      <GridContainer>
        {mockEventData.map((event, index) => (
          <EventCard key={index} {...event} />
        ))}
      </GridContainer>
    </StyledDiv>
  );
}

export default Home;
