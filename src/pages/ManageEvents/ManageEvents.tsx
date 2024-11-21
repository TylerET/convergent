import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Link as ChakraLink,
  Skeleton,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StyledDiv } from "./ManageEvents.styles";
import EventCardContainer from "../../components/common/EventCardContainer/EventCardContainer";
import { useCustomer } from "../../contexts/CustomerContext/CustomerContext";
import { getAllEventsByHostedById } from "../../api/apiService";

const ManageEvents = () => {
  const [hostedEvents, setHostedEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isLoggedIn, customerData } = useCustomer();
  const navigation = useNavigate();
  useEffect(() => {
    if (isLoggedIn && customerData?.userId) {
      getAllEventsByHostedById(customerData?.userId)
        .then((response) => {
          if (response) {
            setHostedEvents(response);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          navigation("/");
        });
    } else {
      navigation("/");
    }
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
          {hostedEvents?.length > 0 ? (
            <EventCardContainer
              title="My Hosted Events"
              eventCards={hostedEvents}
            />
          ) : (
            <p>
              Looks like you don't have any events,{" "}
              <ChakraLink
                onClick={() => navigation("/events/host")}
                cursor={"pointer"}
                _hover={{ textDecoration: "underline" }}
                color="teal"
              >
                try hosting one!
              </ChakraLink>
            </p>
          )}
        </StyledDiv>
      </Skeleton>
    </>
  );
};

export default ManageEvents;
