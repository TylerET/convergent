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
import { Link, useNavigate } from "react-router-dom";
import {
  getLocalStorageItem,
  removeEventIdFromLocalStorage,
  saveEventIdToLocalStorage,
} from "../../../utils/localStorageUtils";
import { useCustomer } from "../../../contexts/CustomerContext/CustomerContext";

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
  useEffect(() => {
    const myEvents = getLocalStorageItem("MyEvents");
    setIsFavorite(myEvents?.includes(eventId));
  }, []);

  const handleFavoriteClick = () => {
    isFavorite
      ? removeEventIdFromLocalStorage(eventId)
      : saveEventIdToLocalStorage(eventId);
    setIsFavorite((prevState: boolean) => !prevState);
  };
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
            <Icon
              as={isFavorite ? StarFilled : StarOutline}
              boxSize={6}
              ml={"auto"}
              cursor={"pointer"}
              onClick={handleFavoriteClick}
            />
          </HStack>
        </Stack>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
