import React, { useEffect, useRef, useState } from "react";
import { EventCardProps } from "./typings/EventCardProps";
import {
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ReactComponent as PersonIcon } from "../../../assets/icons/person-svgrepo-com.svg";
import { ReactComponent as TicketIcon } from "../../../assets/icons/ticket-4-svgrepo-com.svg";
import { ReactComponent as StarFilled } from "../../../assets/icons/star-filled.svg";
import { ReactComponent as StarOutline } from "../../../assets/icons/star-outline.svg";
import { Link } from "react-router-dom";
import {
  deleteHostedEvent,
  getHostedEvents,
  getLocalStorageItem,
} from "../../../utils/localStorageUtils";
import { DeleteIcon } from "@chakra-ui/icons";
import { useCustomer } from "../../../contexts/CustomerContext/CustomerContext";
import { updateUser } from "../../../api/apiService";

const EventCard = ({
  title,
  hostedBy,
  date,
  time,
  attendees,
  admission,
  imageSrc,
  imageAlt,
  eventId,
}: EventCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHostedByMe, setIsHostedByMe] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const { isLoggedIn, customerData, setCustomerData } = useCustomer();

  useEffect(() => {
    const myEvents = getLocalStorageItem("MyEvents");
    const myHostedEvents = getHostedEvents();
    const myHostedEventIds = myHostedEvents.map((event: any) => event.eventId);
    setIsHostedByMe(myHostedEventIds?.includes(eventId));
    if (customerData?.events) {
      setIsFavorite(customerData?.events?.includes(eventId));
    }
  }, [customerData]);

  const handleFavoriteClick = () => {
    if (customerData?.userId && customerData?.events) {
      const updatedEvents = isFavorite
        ? customerData?.events.filter((event) => event !== eventId)
        : [...customerData?.events, eventId];
      // @ts-ignore
      const setArray = [...new Set(updatedEvents)];
      updateUser(customerData?.userId, setArray).then((response) => {
        setIsFavorite((prevState: boolean) => !prevState);
        setCustomerData({ ...customerData, events: setArray });
      });
    }
  };

  const handleDeleteEvent = () => {
    deleteHostedEvent(eventId);
    setIsDeleted(true);
  };

  const getIconButton = () => {
    if (!isLoggedIn) return null;
    return !isHostedByMe ? (
      <Icon
        as={isFavorite ? StarFilled : StarOutline}
        boxSize={6}
        ml={"auto"}
        cursor={"pointer"}
        onClick={handleFavoriteClick}
      />
    ) : (
      <Icon
        as={DeleteIcon}
        boxSize={6}
        ml={"auto"}
        cursor={"pointer"}
        onClick={handleDeleteEvent}
      />
    );
  };

  if (isDeleted) return null;
  return (
    <Card maxW="sm">
      <CardBody
        cursor={"pointer"}
        as={Link}
        to={`/events/details/${eventId}`}
        mb={0}
        pb={0}
      >
        <Image
          src={`${imageSrc}/250/200`}
          alt={imageAlt}
          borderRadius={"lg"}
          fallbackStrategy="beforeLoadOrError"
          fallback={<Skeleton width={"250px"} height={"200px"} />}
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{title}</Heading>
          <Text>{`Hosted by: ${hostedBy}`}</Text>
          <Flex justifyContent={"space-between"}>
            <Text>{date.toLocaleDateString()}</Text>
            {time && <Text>{time}</Text>}
          </Flex>
        </Stack>
      </CardBody>
      <CardFooter mt={0} pt={0}>
        <Stack width={"100%"}>
          {(attendees || admission) && <Divider />}
          <HStack spacing={4} alignItems={"center"}>
            {attendees && (
              <>
                <Icon as={PersonIcon} boxSize={4} />
                <Text
                  verticalAlign={"center"}
                  marginBottom={0}
                >{`${attendees}`}</Text>
              </>
            )}
            {admission && (
              <>
                <Icon as={TicketIcon} boxSize={4} />
                <Text
                  verticalAlign={"center"}
                  marginBottom={0}
                >{`${admission}`}</Text>
              </>
            )}
            {getIconButton()}
          </HStack>
        </Stack>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
