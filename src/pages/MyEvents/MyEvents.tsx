import React from "react";
import { StyledDiv } from "./MyEvents.styles";
import EventCardContainer from "../../components/common/EventCardContainer/EventCardContainer";
import { getUserEvents } from "../../utils/localStorageUtils";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const MyEvents = () => {
  const filteredEvents = getUserEvents();

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
          <BreadcrumbLink href="#">My Events</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <StyledDiv>
        <EventCardContainer title="My Events" eventCards={filteredEvents} />
      </StyledDiv>
    </>
  );
};

export default MyEvents;
