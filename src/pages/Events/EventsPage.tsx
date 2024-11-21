import React, { useEffect, useState } from "react";
import { StyledDiv } from "./EventsPage.styles";
import EventCardContainer from "../../components/common/EventCardContainer/EventCardContainer";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { EventCardProps } from "../../components/common/EventCard/typings/EventCardProps";
import { useCustomer } from "../../contexts/CustomerContext/CustomerContext";
import { getEventsByLocation } from "../../api/apiService";

const EventsPage = () => {
  const { selectedLocation } = useCustomer();
  const [locationEvents, setLocationEvents] = useState<EventCardProps[]>([]);

  useEffect(() => {
    if (selectedLocation) {
      getEventsByLocation(selectedLocation).then((response) => {
        if (response) {
          setLocationEvents(response);
        } else {
          setLocationEvents([]);
        }
      });
    }
  }, [selectedLocation]);
  return (
    <>
      <Breadcrumb
        spacing="8px"
        separator={<ChevronRightIcon color="gray.500" />}
      >
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">All Events</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <StyledDiv>
        <EventCardContainer
          showLocation
          title="All Events in"
          eventCards={locationEvents}
        />
      </StyledDiv>
    </>
  );
};

export default EventsPage;
