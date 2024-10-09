import React from "react";
import { StyledDiv } from "./Home.styles";
import EventCardContainer from "../../components/common/EventCardContainer/EventCardContainer";
import mockEventData from "../../mocks/mockEvents";
import { Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigation = useNavigate();
  const navigateToViewAllEvents = () => navigation("/events");
  return (
    <StyledDiv>
      <Stack>
        <EventCardContainer
          eventCards={mockEventData.slice(0, 8)}
          title="Events Near"
          location="Charlotte"
          linkText="See all events"
          linkAction={navigateToViewAllEvents}
        />
        <EventCardContainer
          eventCards={mockEventData
            .slice(8, 8 + 4)
            .sort(
              (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
            )}
          title="Upcoming events"
          linkText="See all events"
          linkAction={navigateToViewAllEvents}
        />
      </Stack>
    </StyledDiv>
  );
}

export default Home;
