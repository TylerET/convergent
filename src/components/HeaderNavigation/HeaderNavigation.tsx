import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Button,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Center,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import logo from "../../assets/convergent-logo-only.png";

function HeaderNavigation() {
  return (
    <Box bg="white" px={4} borderBottom="1px solid lightgray">
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        <a href="/" style={{ display: "flex" }}>
          <img src={logo} alt="Convergent logo" style={{ height: "40px" }} />

          <Text fontSize="2xl" fontWeight="bold" color="teal" marginBottom="0">
            Convergent
          </Text>
        </a>

        {/* Search Bar */}
        <Flex flex={1} mx={16}>
          <InputGroup size="md">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Search events"
              borderRadius="full"
            />
          </InputGroup>
          <Select
            placeholder="Location"
            ml={4}
            maxW="200px"
            borderRadius="full"
            defaultValue={"charlotte"}
          >
            <option value="ny">New York, NY</option>
            <option value="sf">San Francisco, CA</option>
            <option value="la">Los Angeles, CA</option>
            <option value="charlotte">Charlotte, NC</option>
          </Select>
          <Button ml={2} colorScheme="teal" borderRadius="full" px={6}>
            Search
          </Button>
        </Flex>

        {/* User Options */}
        <Flex alignItems="center">
          <Button as={Link} to="/login" variant="link" mr={4}>
            Log in
          </Button>
          <Button
            as={Link}
            to="/signup"
            colorScheme="orange"
            borderRadius="full"
          >
            Sign up
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}

export default HeaderNavigation;
