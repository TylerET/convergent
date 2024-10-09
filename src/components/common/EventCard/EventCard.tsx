import React from "react";
import { EventCardProps } from "./typings/EventCardProps";
import {
  Card,
  CardBody,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ReactComponent as PersonIcon } from "../../../assets/icons/person-svgrepo-com.svg";
import { ReactComponent as TicketIcon } from "../../../assets/icons/ticket-4-svgrepo-com.svg";
import { useNavigate } from "react-router-dom";

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
  const navigation = useNavigate();
  return (
    <Card
      maxW="sm"
      cursor={"pointer"}
      onClick={() => {
        navigation(`/event/details/${eventId}`);
      }}
    >
      <CardBody>
        <Image src={`${imageSrc}/250/200`} alt={imageAlt} borderRadius={"lg"} />
        <Stack mt="6" spacing="3">
          <Heading size="md">{title}</Heading>
          <Text>{`Hosted by: ${hostedBy}`}</Text>
          <Flex justifyContent={"space-between"}>
            <Text>{date.toLocaleDateString()}</Text>
            {time && <Text>{time}</Text>}
          </Flex>
        </Stack>
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
        </HStack>
      </CardBody>
    </Card>
  );
};

export default EventCard;
