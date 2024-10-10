import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Stack,
  Heading,
  Select,
  Tag,
  Text,
} from "@chakra-ui/react";
import { mockTags } from "../../mocks/mockTags";
import { mockLocations } from "../../mocks/mockLocations";
import { getNextEventId, saveHostedEvent } from "../../utils/localStorageUtils";
import { useCustomer } from "../../contexts/CustomerContext/CustomerContext";
import { formatDateToYYYYMMDD } from "../../utils/utils";
import { useNavigate } from "react-router-dom";

const HostEvent = () => {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState("");

  const { customerData, isLoggedIn } = useCustomer();
  const navigation = useNavigate();

  const handleSubmit = () => {
    const eventId = String(getNextEventId()) ?? "";
    const newEvent = {
      eventId,
      title: eventName,
      description: eventDescription,
      date: formatDateToYYYYMMDD(eventDate),
      startTime,
      endTime,
      location,
      tags,
      hostedBy: (customerData?.name as string) ?? "John Doe",
      imageSrc: `https://picsum.photos/id/${eventId}`,
    };
    // @ts-expect-error
    saveHostedEvent(newEvent);
    navigation(`/events/details/${eventId}`);
  };

  const addTag = () => {
    if (selectedTag && !tags.includes(selectedTag)) {
      setTags([...tags, selectedTag]);
      setSelectedTag("");
    }
  };

  if (!isLoggedIn)
    return (
      <Box p={8} maxW="600px" mx="auto">
        <Text>You must be logged in to host an event</Text>
      </Box>
    );

  return (
    <Box p={8} maxW="600px" mx="auto">
      <Heading mb={6}>Host an Event</Heading>
      <Stack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Event Name</FormLabel>
          <Input
            placeholder="Enter event name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder="Enter a description of the event"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Date</FormLabel>
          <Input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Start Time</FormLabel>
          <Input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>End Time</FormLabel>
          <Input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Location</FormLabel>
          <Select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="" disabled>
              Enter event location
            </option>
            <option value="Remote">Remote</option>
            {mockLocations.map((location) => (
              <option key={location.value} value={location.value}>
                {location.label}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Tags</FormLabel>
          <Select
            placeholder="Select tag"
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
          >
            {mockTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </Select>
          <Button mt={2} onClick={addTag}>
            Add Tag
          </Button>

          <Stack direction="row" mt={2}>
            {tags.map((tag) => (
              <Tag key={tag} colorScheme="teal">
                {tag}
              </Tag>
            ))}
          </Stack>
        </FormControl>

        <Button colorScheme="teal" onClick={handleSubmit}>
          Submit Event
        </Button>
      </Stack>
    </Box>
  );
};

export default HostEvent;
