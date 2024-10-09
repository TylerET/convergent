import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Button,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Avatar,
  AvatarBadge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import logo from "../../assets/convergent-logo-only.png";
import { useCustomer } from "../../contexts/CustomerContext/CustomerContext";

function HeaderNavigation() {
  const { isLoggedIn, logOut, selectedLocation, updateLocation, logIn } =
    useCustomer();
  const navigation = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigation(`events/search?query=${encodeURIComponent(searchQuery)}`);
    } else {
      navigation(`/`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <Box bg="white" px={4} borderBottom="1px solid lightgray">
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        <Link to="/" style={{ display: "flex", cursor: "pointer" }}>
          <img src={logo} alt="Convergent logo" style={{ height: "40px" }} />

          <Text fontSize="2xl" fontWeight="bold" color="teal" marginBottom="0">
            Convergent
          </Text>
        </Link>

        <Flex flex={1} mx={16}>
          <InputGroup size="md">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Search events"
              borderRadius="full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
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
          <Button
            ml={2}
            colorScheme="teal"
            borderRadius="full"
            px={6}
            onClick={handleSearch}
          >
            Search
          </Button>
        </Flex>
        <Flex alignItems="center">
          {isLoggedIn ? (
            <>
              <Button as={Link} variant="link" mr={4} onClick={logOut}>
                Log out
              </Button>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded="full"
                  variant="link"
                  cursor="pointer"
                >
                  <Avatar>
                    <AvatarBadge boxSize="1.25em" bg="green.500" />
                  </Avatar>
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => navigation("/my-events")}>
                    My Events
                  </MenuItem>
                  <MenuItem
                    onClick={() => console.log("Change Avatar clicked")}
                  >
                    Change Avatar
                  </MenuItem>
                  <MenuItem onClick={logOut}>Log out</MenuItem>
                </MenuList>
              </Menu>
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
