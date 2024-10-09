import React from "react";
import { EventCardProps } from "./typings/EventCardProps";
import {
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

const EventCard = ({
  title,
  hostedBy,
  date,
  time,
  attendees,
  admission,
  imageSrc,
  imageAlt,
}: EventCardProps) => {
  // date logic if needed
  return (
    <Card maxW="sm" w={"sm"}>
      <CardBody>
        <Image src={imageSrc} alt={imageAlt} borderRadius={"lg"} />
        <Stack mt="6" spacing="3">
          <Heading size="md">{title}</Heading>
          <Text>{hostedBy}</Text>
          <Text>{date.toLocaleDateString()}</Text>
          {time && <Text>{time}</Text>}
        </Stack>
      </CardBody>
      {(attendees || admission) && <Divider />}
      <CardFooter>
        {attendees && <Text>{attendees}</Text>}
        {admission && <Text>{admission}</Text>}
      </CardFooter>
    </Card>
  );
};

export default EventCard;
