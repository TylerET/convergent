import React, { useEffect, useState } from "react";
import { AttendeesProps } from "./typings/AttendeesProps";
import { Avatar, Box, Card, Flex, Stack, Tag, Text } from "@chakra-ui/react";

import { getAttendeesByEventId } from "../../../api/apiService";

export interface AttendeeCardProps {
  firstName: string;
  picture: string;
  hostedById: number;
  userId: number;
  email: string;
}

const AttendeeCard = ({
  firstName,
  picture,
  email,
  hostedById,
  userId,
}: AttendeeCardProps) => {
  return (
    <div>
      <Card
        key={picture}
        maxW={"150px"}
        padding={4}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Stack align={"center"}>
          <Avatar size="lg" src={picture} />
          <Text fontWeight={"bold"} mb={0} maxWidth={100} noOfLines={1}>
            {firstName ?? email}
          </Text>
          <Tag mb={0}>{hostedById === userId ? "Host" : "Member"}</Tag>
        </Stack>
      </Card>
    </div>
  );
};

const Attendees = ({ eventId, hostedById }: AttendeesProps) => {
  const [attendees, setAttendees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [extraAttendeesCount, setExtraAttendeesCount] = useState<number>(0);
  const maxVisibleAttendees = 3;

  useEffect(() => {
    getAttendeesByEventId(eventId)
      .then((response) => {
        if (response) {
          setAttendees(response.slice(0, maxVisibleAttendees));
          setExtraAttendeesCount(response?.length - maxVisibleAttendees);
          setIsLoading(false);
        } else {
          setAttendees([]);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  if (isLoading) return null;

  return (
    <Flex gap={8}>
      {attendees.map((attendee: any) => (
        <AttendeeCard {...attendee} hostedById={hostedById} />
      ))}
      {extraAttendeesCount > 0 && (
        <Card
          maxW={"150px"}
          padding={4}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Stack>
            <Box sx={{ display: "grid" }} filter="blur(4px)" mb={4}>
              <Avatar
                sx={{ gridColumn: "1", gridRow: "1" }}
                mr={4}
                src={"https://randomuser.me/api/portraits/women/10.jpg"}
              />
              <Avatar
                sx={{ gridColumn: "1", gridRow: "1" }}
                ml={4}
                src={"https://randomuser.me/api/portraits/men/10.jpg"}
              />
              <Avatar
                sx={{ gridColumn: "1", gridRow: "1" }}
                ml={8}
                src={"https://randomuser.me/api/portraits/women/11.jpg"}
              />
            </Box>
            <Text fontWeight={"bold"} color="teal" fontSize="sm">
              +{extraAttendeesCount} more
            </Text>
          </Stack>
        </Card>
      )}
    </Flex>
  );
};

export default Attendees;
