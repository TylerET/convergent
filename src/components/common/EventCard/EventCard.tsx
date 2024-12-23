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
  getHostedEvents,
  getLocalStorageItem,
} from "../../../utils/localStorageUtils";
import { DeleteIcon } from "@chakra-ui/icons";
import { useCustomer } from "../../../contexts/CustomerContext/CustomerContext";
import {
  addUserEvent,
  deleteEvent,
  removeUserEvent,
} from "../../../api/apiService";

const EventCard = ({
  title,
  hostedBy,
  date,
  time,
  attendees = [],
  admission,
  image,
  eventId,
  hostedById,
}: EventCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHostedByMe, setIsHostedByMe] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const { isLoggedIn, customerData, setCustomerData } = useCustomer();
  const formattedDate = new Date(date).toLocaleDateString();

  useEffect(() => {
    if (customerData?.events) {
      setIsHostedByMe(customerData?.userId === hostedById);
      setIsFavorite(customerData?.events?.includes(eventId));
    }
  }, [customerData]);

  const handleFavoriteClick = () => {
    if (customerData?.userId && customerData?.events) {
      const handleUpdate = async () => {
        return isFavorite
          ? removeUserEvent(Number(customerData?.userId), Number(eventId))
          : addUserEvent(Number(customerData?.userId), Number(eventId));
      };
      handleUpdate()
        .then((response: any) => {
          if (response) {
            setIsFavorite((prevState: boolean) => !prevState);
            setCustomerData(response);
          }
        })
        .catch((error: any) => console.error(error.message));
    }
  };

  const handleDeleteEvent = () => {
    deleteEvent(eventId).then((response) => {
      if (response) {
        setIsDeleted(true);
      }
    });
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
    <Card maxW="calc(250px + 1.25rem)">
      <CardBody
        cursor={"pointer"}
        as={Link}
        to={`/events/details/${eventId}`}
        mb={0}
        pb={0}
      >
        <Image
          src={`${image?.src}/250/200`}
          alt={image?.alt}
          borderRadius={"lg"}
          fallbackStrategy="beforeLoadOrError"
          fallback={<Skeleton width={"222.5px"} height={"178px"} />}
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{title}</Heading>
          <Text>{`Hosted by: ${hostedBy}`}</Text>
          <Flex justifyContent={"space-between"}>
            <Text>{formattedDate}</Text>
            {time && <Text>{time}</Text>}
          </Flex>
        </Stack>
      </CardBody>
      <CardFooter mt={0} pt={0}>
        <Stack width={"100%"}>
          {(attendees?.length > 0 || admission) && <Divider />}
          <HStack spacing={4} alignItems={"center"}>
            {attendees?.length > 0 && (
              <>
                <Icon as={PersonIcon} boxSize={4} />
                <Text
                  verticalAlign={"center"}
                  marginBottom={0}
                >{`${attendees?.length}`}</Text>
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
