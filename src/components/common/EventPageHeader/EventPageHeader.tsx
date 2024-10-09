import React from "react";
import { EventPageHeaderProps } from "./typings/EventPageHeaderProps";
import {
  Avatar,
  AvatarBadge,
  Divider,
  Flex,
  Stack,
  Text,
} from "@chakra-ui/react";

const EventPageHeader = ({ event }: EventPageHeaderProps) => {
  const { title, hostedBy } = event;
  return (
    <Stack>
      <Text fontSize={"5xl"} fontWeight={"bold"}>
        {title}
      </Text>
      <Flex>
        <Avatar mr={"1rem"} size={"lg"}>
          <AvatarBadge></AvatarBadge>
        </Avatar>
        <Stack>
          <Text mb={0}>Hosted By</Text>
          <Text fontWeight={"bold"} mb={0}>
            {hostedBy}
          </Text>
        </Stack>
      </Flex>
      <Divider width={"100%"} />
    </Stack>
  );
};

export default EventPageHeader;
