import React from "react";
import { StyledDiv } from "./EventsPage.styles";
import EventCardContainer from "../../components/common/EventCardContainer/EventCardContainer";
import mockEventData from "../../mocks/mockEvents";

const EventsPage = () => {
  return (
    <StyledDiv>
      <EventCardContainer title="All Events" eventCards={mockEventData} />
    </StyledDiv>
  );
};

export default EventsPage;
