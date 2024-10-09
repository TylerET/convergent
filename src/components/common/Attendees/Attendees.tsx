import React from "react";
import { AttendeesProps } from "./typings/AttendeesProps";
import {
  Avatar,
  Box,
  Card,
  Flex,
  Link,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import { mockAttendees } from "../../../mocks/mockAttendees";

export interface AttendeeCardProps {
  name: string;
  role: string;
  imageSrc: string;
}

const AttendeeCard = ({ name, role, imageSrc }: AttendeeCardProps) => {
  return (
    <div>
      <Card
        maxW={"150px"}
        padding={4}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Stack align={"center"}>
          <Avatar size="lg" src={imageSrc} />
          <Text fontWeight={"bold"} mb={0} maxWidth={100} noOfLines={1}>
            {name}
          </Text>
          <Tag mb={0}>{role}</Tag>
        </Stack>
      </Card>
    </div>
  );
};

const Attendees = ({ numberOfAttendees }: AttendeesProps) => {
  const maxVisibleAttendees = 3;
  const extraAttendeesCount = numberOfAttendees - 3;
  return (
    <Flex gap={8}>
      {mockAttendees.slice(0, maxVisibleAttendees).map((attendee) => (
        <AttendeeCard {...attendee} />
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
