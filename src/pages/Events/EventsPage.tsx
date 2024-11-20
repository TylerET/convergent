import React from "react";
import { StyledDiv } from "./EventsPage.styles";
import EventCardContainer from "../../components/common/EventCardContainer/EventCardContainer";
import mockEventData from "../../mocks/mockEvents";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const EventsPage = () => {
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
        {/* <EventCardContainer title="All Events" eventCards={mockEventData} /> */}
      </StyledDiv>
    </>
  );
};

export default EventsPage;
