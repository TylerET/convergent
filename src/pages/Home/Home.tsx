import React, { useEffect, useState } from "react";
import { StyledDiv } from "./Home.styles";
import EventCardContainer from "../../components/common/EventCardContainer/EventCardContainer";
import { Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useCustomer } from "../../contexts/CustomerContext/CustomerContext";
import {
  getAllEventsByUserId,
  getEventsByLocation,
} from "../../api/apiService";
import { EventCardProps } from "../../components/common/EventCard/typings/EventCardProps";

function Home() {
  const navigation = useNavigate();
  const navigateToViewAllEvents = () => navigation("/events");
  const navigateToMyEvents = () => navigation("/my-events");
  const { isLoggedIn, customerData, selectedLocation } = useCustomer();
  const [myEvents, setMyEvents] = useState([]);
  const [locationEvents, setLocationEvents] = useState<EventCardProps[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<EventCardProps[]>([]);

  useEffect(() => {
    if (customerData?.userId && isLoggedIn) {
      getAllEventsByUserId(customerData?.userId).then((response) => {
        if (response) {
          setMyEvents(response);
        }
      });
    }
    if (selectedLocation) {
      getEventsByLocation(selectedLocation).then((response) => {
        if (response) {
          setLocationEvents(response);
          setUpcomingEvents(
            response.filter((event: any) => new Date(event?.date) >= new Date())
          );
        } else {
          setUpcomingEvents([]);
          setLocationEvents([]);
        }
      });
    }
  }, [isLoggedIn, customerData, selectedLocation]);

  return (
    <StyledDiv>
      <Stack style={{ width: "100%" }}>
        {isLoggedIn && myEvents?.length > 0 && (
          <EventCardContainer
            eventCards={myEvents.slice(0, 8)}
            title="Your Events"
            linkText="See my events"
            linkAction={navigateToMyEvents}
          />
        )}
        {locationEvents?.length > 0 && (
          <EventCardContainer
            eventCards={locationEvents.slice(0, 8)}
            title="Events Near"
            linkText="See all events"
            showLocation
            linkAction={navigateToViewAllEvents}
          />
        )}
        {upcomingEvents?.length > 0 && (
          <EventCardContainer
            eventCards={locationEvents
              .sort(
                (a, b) =>
                  new Date(a?.date).getTime() - new Date(b?.date).getTime()
              )
              .slice(0, 8)}
            title="Upcoming Events"
            linkText="See all events"
            linkAction={navigateToViewAllEvents}
          />
        )}
      </Stack>
    </StyledDiv>
  );
}

export default Home;
