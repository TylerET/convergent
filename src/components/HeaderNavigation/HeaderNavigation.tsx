import React, { useContext } from "react";
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
  Avatar,
  AvatarBadge,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import logo from "../../assets/convergent-logo-only.png";
import { useCustomer } from "../../contexts/CustomerContext/CustomerContext";

function HeaderNavigation() {
  const { isLoggedIn, logOut, selectedLocation, updateLocation, logIn } =
    useCustomer();
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
            ml={4}
            maxW="200px"
            borderRadius="full"
            defaultValue={selectedLocation}
            onChange={(e) => updateLocation(e.target.value)}
          >
            <option value="" disabled>
              Location
            </option>
            <option value="ny">New York, NY</option>
            <option value="sf">San Francisco, CA</option>
            <option value="la">Los Angeles, CA</option>
            <option value="charlotte">Charlotte, NC</option>
          </Select>
          <Button ml={2} colorScheme="teal" borderRadius="full" px={6}>
            Search
          </Button>
        </Flex>
        <Flex alignItems="center">
          {isLoggedIn ? (
            <>
              <Button as={Link} variant="link" mr={4} onClick={logOut}>
                Log out
              </Button>
              <Avatar>
                <AvatarBadge boxSize="1.25em" bg="green.500" />
              </Avatar>
            </>
          ) : (
            <>
              <Button
                as={Link}
                onClick={() => {
                  logIn("John Doe", "JohnDoe@email.com");
                }}
                variant="link"
                mr={4}
              >
                Log in
              </Button>
              <Button
                as={Link}
                onClick={() => {
                  logIn("John Doe", "JohnDoe@email.com");
                }}
                colorScheme="orange"
                borderRadius="full"
              >
                Sign up
              </Button>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}

export default HeaderNavigation;
