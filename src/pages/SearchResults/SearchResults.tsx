import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import mockEventData from "../../mocks/mockEvents";
import {
  Box,
  BreadcrumbLink,
  Heading,
  Breadcrumb,
  BreadcrumbItem,
} from "@chakra-ui/react";
import EventCardContainer from "../../components/common/EventCardContainer/EventCardContainer";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { StyledDiv } from "./SearchResults.styles";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() || "";

  const filteredEvents = mockEventData.filter(
    (event) =>
      event.title.toLowerCase().includes(query) ||
      event.hostedBy.toLocaleLowerCase().includes(query) ||
      event.tags.some((tag) => tag.toLocaleLowerCase().includes(query))
  );

  return (
    <Box>
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
          <BreadcrumbLink href="#">Search</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Heading mb={4}>Search Results for "{query}"</Heading>
      {filteredEvents.length > 0 ? (
        <StyledDiv>
          {/* <EventCardContainer eventCards={filteredEvents} /> */}
        </StyledDiv>
      ) : (
        <p>No events found matching your search.</p>
      )}
    </Box>
  );
}

export default SearchResults;
