import React, { useState } from 'react';
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
  Link
} from "@chakra-ui/react";
import { HamburgerIcon } from '@chakra-ui/icons';
import SignupCurrenciesSelector from "../../SignUp/components/SignupCurrenciesSelector";
const ProfileCard = ({ gridArea, baseCurrency, username }) => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const avatar = "./src/assets/DefaultAvatar.svg"; 
  const [modalContent, setModalContent] = useState(""); // Track which form to show

  const openModal = (content) => {
    setModalContent(content);
    onOpen();
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('User is not logged in or session expired.');
      return;
    }
    const formData = new FormData(event.currentTarget); 

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
  
  try {
    const response = await fetch(`http://localhost:3000/api/user/${userId}`, {
      method: 'PUT',
      body: formData,
    });

    if (response.ok) {
      alert('Profile updated successfully');
      onClose(); // Close modal after successful update
    } else {
      throw new Error('Failed to update profile');
    }
  } catch (error) {
    alert('Update error: ' + error.message);
  }
};

const handleCurrencyChange = (newCurrency) => {
  // Update state or send update to server
  console.log("Selected currency:", newCurrency);
};

  return (
    <Card gridArea={gridArea}>
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
      <Link href="/forgot-password" ml={3}>Change Password</Link>
        <MenuItem onClick={() => openModal('currency')}>Change Base Currency</MenuItem>
      </MenuList>
    </Menu>
        </Flex >
        <Flex align="center">
          <Avatar
            src={avatar}
          />
          <Text ml={3}>{username}</Text>  
        </Flex>
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
          <form onSubmit={handleSubmit}>
          <ModalBody pb={6}>
              {modalContent === 'currency' && (
                <FormControl>
                  <FormLabel>Base Currency</FormLabel>
                  <SignupCurrenciesSelector handleChange={handleCurrencyChange} setIsSelected={() => {}} />
                </FormControl>
              )}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                Save Changes
              </Button>
              <Button variant="ghost" onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default ProfileCard;
