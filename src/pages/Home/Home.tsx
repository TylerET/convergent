import React, { useEffect, useState } from "react";
import { StyledDiv } from "./Home.styles";
import EventCardContainer from "../../components/common/EventCardContainer/EventCardContainer";
import mockEventData from "../../mocks/mockEvents";
import { Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useCustomer } from "../../contexts/CustomerContext/CustomerContext";
import { getUserEvents } from "../../utils/localStorageUtils";
import { getAllEvents, getAllEventsByUserId } from "../../api/apiService";

function Home() {
  const navigation = useNavigate();
  const navigateToViewAllEvents = () => navigation("/events");
  const navigateToMyEvents = () => navigation("/my-events");
  const { isLoggedIn, customerData } = useCustomer();
  const [myEvents, setMyEvents] = useState([]);

  useEffect(() => {
    if (customerData?.userId && isLoggedIn) {
      getAllEventsByUserId(customerData?.userId).then((response) => {
        if (response) {
          setMyEvents(response);
        }
      });
    }
  }, [isLoggedIn, customerData]);

  return (
    <StyledDiv>
      <Stack>
        {isLoggedIn && myEvents?.length > 0 && (
          <EventCardContainer
            eventCards={myEvents}
            title="Your Upcoming Events"
            linkText="See my events"
            linkAction={navigateToMyEvents}
          />
        )}
        {/* <EventCardContainer
          eventCards={mockEventData.slice(0, 8)}
          title="Events Near"
          linkText="See all events"
          showLocation
          linkAction={navigateToViewAllEvents}
        />
        <EventCardContainer
          eventCards={mockEventData
            .slice(8, 8 + 4)
            .sort(
              (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
            )}
          title="Upcoming Events"
          linkText="See all events"
          linkAction={navigateToViewAllEvents}
        /> */}
      </Stack>
    </StyledDiv>
  );
}

export default Home;
