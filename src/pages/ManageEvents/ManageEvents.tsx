import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Skeleton,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { StyledDiv } from "./ManageEvents.styles";
import EventCardContainer from "../../components/common/EventCardContainer/EventCardContainer";
import { getHostedEvents } from "../../utils/localStorageUtils";

const ManageEvents = () => {
  const [hostedEvents, setHostedEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setHostedEvents(getHostedEvents());
    setIsLoading(false);
  }, []);

  return (
    <>
      <Skeleton isLoaded={!isLoading}>
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
            <BreadcrumbLink href="#">Manage My Events</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <StyledDiv>
          <EventCardContainer
            title="My Hosted Events"
            eventCards={hostedEvents}
          />
        </StyledDiv>
      </Skeleton>
    </>
  );
};

export default ManageEvents;
