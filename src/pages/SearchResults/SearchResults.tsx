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

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() || "";

  const filteredEvents = mockEventData.filter(
    (event) =>
      event.title.toLowerCase().includes(query) ||
      event.hostedBy.toLocaleLowerCase().includes(query)
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
        <EventCardContainer eventCards={filteredEvents} />
      ) : (
        <p>No events found matching your search.</p>
      )}
    </Box>
  );
}

export default SearchResults;
