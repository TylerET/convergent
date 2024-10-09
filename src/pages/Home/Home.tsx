import React from "react";
import { StyledDiv } from "./Home.styles";
import EventCardContainer from "../../components/common/EventCardContainer/EventCardContainer";
import mockEventData from "../../mocks/mockEvents";
import { Stack, Text } from "@chakra-ui/react";
import { useCustomer } from "../../contexts/CustomerContext/CustomerContext";

function Home() {
  return (
    <StyledDiv>
      <Stack>
        <EventCardContainer
          eventCards={mockEventData.slice(0, 8)}
          title="Events Near"
          location="Charlotte"
          linkText="See all events"
          linkAction={() => {
            console.log("link clicked!");
          }}
        />
        <EventCardContainer
          eventCards={mockEventData
            .slice(8, 8 + 4)
            .sort(
              (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
            )}
          title="Upcoming events"
          linkText="See all events"
          linkAction={() => {
            console.log("link clicked!");
          }}
        />
      </Stack>
    </StyledDiv>
  );
}

export default Home;
