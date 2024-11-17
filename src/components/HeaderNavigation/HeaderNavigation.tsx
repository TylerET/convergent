import React, { useRef, useState } from "react";
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
import UploadAvatarDrawer from "../UploadAvatarDrawer/UploadAvatarDrawer";
import { mockLocations } from "../../mocks/mockLocations";

function HeaderNavigation() {
  const {
    isLoggedIn,
    logOut,
    selectedLocation,
    updateLocation,
    logIn,
    customerData,
  } = useCustomer();
  const navigation = useNavigate();
  const [isAvatarDrawerOpen, setIsAvatarDrawerOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [CurrentImage, setCurrentImage] = useState<string | null>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

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
            ref={selectRef}
            ml={4}
            maxW="200px"
            borderRadius="full"
            defaultValue={selectedLocation}
            onChange={(e) => updateLocation(e.target.value)}
          >
            <option value="" disabled>
              Location
            </option>
            {mockLocations.map((location) => (
              <option key={location.value} value={location.value}>
                {location.label}
              </option>
            ))}
          </Select>
          <Button
            ml={2}
            colorScheme="teal"
            borderRadius="full"
            px={10}
            onClick={handleSearch}
          >
            Search
          </Button>
        </Flex>
        <Flex alignItems="center">
          {isLoggedIn ? (
            <>
              <Button
                as={Link}
                variant="link"
                mr={4}
                onClick={() => {
                  logOut();
                }}
              >
                Log out
              </Button>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded="full"
                  variant="link"
                  cursor="pointer"
                >
                  {customerData?.picture ? (
                    <Avatar src={customerData?.picture} />
                  ) : (
                    <Avatar>
                      <AvatarBadge boxSize="1.25em" bg="green.500" />
                    </Avatar>
                  )}
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => navigation("/my-events")}>
                    My Events
                  </MenuItem>
                  <MenuItem onClick={() => navigation("/events/host")}>
                    Host An Event
                  </MenuItem>
                  <MenuItem onClick={() => navigation("/events/host/manage")}>
                    Manage My Hosted Events
                  </MenuItem>
                  <MenuItem onClick={() => setIsAvatarDrawerOpen(true)}>
                    Upload Avatar
                  </MenuItem>
                  <MenuItem onClick={() => logOut()}>Log out</MenuItem>
                </MenuList>
              </Menu>
            </>
          ) : (
            <>
              <Button
                as={Link}
                onClick={() => {
                  logIn();
                }}
                variant="link"
                mr={4}
              >
                Log in
              </Button>
              <Button
                as={Link}
                onClick={() => {
                  logIn("signup");
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
      <UploadAvatarDrawer
        open={isAvatarDrawerOpen}
        setOpen={setIsAvatarDrawerOpen}
      />
    </Box>
  );
}

export default HeaderNavigation;
