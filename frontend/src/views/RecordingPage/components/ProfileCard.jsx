import { useState } from 'react';
import axios from "axios";
import {
  Box,
  Card,
  Flex,
  CardHeader,
  Heading,
  Button,
  Divider,
  Avatar,
  CardBody,
  Text,
  Modal,
  Input,
  FormLabel,
  FormControl,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Center,
  VStack
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import BaseCurrencySelector from "./BaseCurrencySelector.jsx";


const ProfileCard = ({ gridArea, baseCurrency, username }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const avatar = "./src/assets/DefaultAvatar.svg";
  const [modalContent, setModalContent] = useState(""); // Track which form to show
  const changeBaseUrl = import.meta.env.VITE_CHANGE_BASE_URL;
  const changePasswordUrl = import.meta.env.VITE_CHANGE_PASSWORD_URL;
  const [currentBaseCurrency, setCurrentBaseCurrency] = useState(baseCurrency);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleNewPasswordChange = (event) => setNewPassword(event.target.value);
  const handleConfirmPasswordChange = (event) => setConfirmPassword(event.target.value);

  const submitPasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    const authToken = localStorage.getItem("authToken");
    try {
      const response = await axios.post(
        changePasswordUrl,
        {
          password: newPassword,
        },
        {
          headers: { Authorization: `Bearer ${authToken}` }, 
        }
      );
      if (response.status === 200) {
        alert("Password updated successfully");
        onClose();
      } else {
        alert("Failed to update password");
      }
    } catch (error) {
      alert("Failed to update password: " + error.message);
    }
  };

  const handleModalContentChange = (content) => {
    setModalContent(content);
    onOpen();
  };

  const handleCurrencyChange = async (currencyCode) => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      alert("No authorization token found, please login again.");
      return;
    }
    try {
      const response = await axios.post(
        changeBaseUrl,
        { base_currency_code: currencyCode },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      if (response.status === 200) {
        // Update state to reflect the user's choice
        setCurrentBaseCurrency(currencyCode);
        alert("Base currency updated successfully");
        window.location.reload(); // refatch data
        onClose();
      } else {
        alert("Failed to update base currency: " + response.statusText);
      }
    } catch (error) {
      alert("Update error: " + error.message);
    }
  };

  return (
    <Card gridArea={gridArea} h={473}>
      <CardHeader>
        <Flex justify="space-between" align="center">
          <Heading size="sm" textTransform="uppercase">
            Profile
          </Heading>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
            />
            <MenuList>
              <MenuItem onClick={() => handleModalContentChange("currency")}>
                Change Base Currency
              </MenuItem>
              <MenuItem onClick={() => handleModalContentChange("password")}>
                Change Password
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Center align="center">
          <Box>
            <Box
              w="150px"
              h="150px"
              justifyContent="center"
              alignContent="center"
              borderRadius="full"
              border="1px"
              borderStyle="solid"
              borderColor="gray.200"
              m={10}
            >
              <Avatar src={avatar} />
            </Box>
            <Text fontSize={20} fontWeight={700}>
              {username}
            </Text>
          </Box>
        </Center>
        <Divider my={2} />
      </CardHeader>
      <CardBody>
        <Box>
          <Heading size="sm" textTransform="uppercase">
            Base Currency
          </Heading>
          <Text fontSize="lg">{baseCurrency}</Text>
        </Box>
      </CardBody>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Profile</ModalHeader>
          <ModalCloseButton />
             <ModalBody>
            <VStack spacing={4} align="stretch">
              {modalContent === "password" && (
              <FormControl>
                <FormLabel>New Password</FormLabel>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                />
                <FormLabel>Confirm New Password</FormLabel>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                <Button
                  mt={4}
                  colorScheme="blue"
                  onClick={submitPasswordChange}
                >
                  Update Password
                </Button>
              </FormControl>
            )}
            </VStack>
            {modalContent === "currency" && (
              <Flex direction="column" mt="auto" p={4}>
                <FormControl mb={4}>
                  <FormLabel>Base Currency</FormLabel>
                  <BaseCurrencySelector onSelect={handleCurrencyChange} selectedCurrency={currentBaseCurrency} />
                </FormControl>
              </Flex>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );

};

export default ProfileCard;
