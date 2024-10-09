import React from "react";
import { EventCardContainerProps } from "./typings/EventCardContainerProps";
import { ResponsiveGridContainer } from "./EventCardContainer.styles";
import EventCard from "../EventCard/EventCard";
import { Flex, Link, Text } from "@chakra-ui/react";
import { Stack } from "react-bootstrap";

const EventCardContainer = ({
  title,
  location,
  linkText,
  linkAction,
  eventCards,
}: EventCardContainerProps) => {
  // state
  return (
    <Stack>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Flex>
          <Text fontSize={"4xl"} fontWeight={"bold"} mr={2}>
            {title}
          </Text>
          {location && (
            <Text fontSize={"4xl"} fontWeight={"bold"}>
              {location}
            </Text>
          )}
        </Flex>
        <Link
          fontSize={"1xl"}
          color={"teal"}
          fontWeight={"bold"}
          onClick={linkAction}
          verticalAlign={"center"}
          textDecoration={"underline"}
        >
          {linkText}
        </Link>
      </Flex>
      <ResponsiveGridContainer>
        {eventCards.map((event, index) => (
          <EventCard key={index} {...event} />
        ))}
      </ResponsiveGridContainer>
    </Stack>
  );
};

export default EventCardContainer;
