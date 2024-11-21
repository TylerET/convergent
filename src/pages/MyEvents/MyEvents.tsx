import React, { useEffect, useState } from "react";
import { StyledDiv } from "./MyEvents.styles";
import EventCardContainer from "../../components/common/EventCardContainer/EventCardContainer";
import { getUserEvents } from "../../utils/localStorageUtils";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { getAllEventsByUserId } from "../../api/apiService";
import { useCustomer } from "../../contexts/CustomerContext/CustomerContext";

const MyEvents = () => {
  const { isLoggedIn, customerData } = useCustomer();
  const [myEvents, setMyEvents] = useState([]);
  const navigation = useNavigate();
  useEffect(() => {
    if (!customerData?.userId || !isLoggedIn) {
      navigation("/");
    } else {
      getAllEventsByUserId(customerData?.userId).then((response) => {
        if (response) {
          setMyEvents(response);
        }
      });
    }
  }, []);

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
        <EventCardContainer title="My Events" eventCards={myEvents} />
      </StyledDiv>
    </>
  );
};

export default MyEvents;
