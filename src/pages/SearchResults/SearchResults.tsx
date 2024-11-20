import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Box,
  BreadcrumbLink,
  Heading,
  Breadcrumb,
  BreadcrumbItem,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { StyledDiv } from "./SearchResults.styles";
import { getEventsByQuery } from "../../api/apiService";
import EventCardContainer from "../../components/common/EventCardContainer/EventCardContainer";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() || "";
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEventsByQuery(query, 30)
      .then((response) => {
        if (response) {
          console.log("response", response);
          setEvents(response);
        } else {
          setEvents([]);
        }
      })
      .catch((error: any) => {
        console.error(error.message);
        setEvents([]);
      });
  }, [searchParams]);

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
      {events.length > 0 ? (
        <StyledDiv>
          <EventCardContainer eventCards={events} />
        </StyledDiv>
      ) : (
        <p>No events found matching your search.</p>
      )}
    </Box>
  );
}

export default SearchResults;
