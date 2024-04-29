import React, { useState } from 'react';
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
  useDisclosure
} from "@chakra-ui/react";

const ProfileCard = ({ gridArea, preferredCurrency }) => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [avatar, setAvatar] = useState("./src/assets/DefaultAvatar.svg"); // Default avatar path

  const handleAvatarError = (e) => {
    e.target.onerror = null;
    e.target.src = "https://bit.ly/sage-adebayo"; // Fallback avatar if error
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedData = {
      password: formData.get('password'),
      avatar: formData.get('avatar'),
      country: formData.get('country')
    };
    console.log(updatedData); // Here you would instead send this to the server
    onClose(); // Close modal after submit
  };

  return (
    <Card gridArea={gridArea}>
      <CardHeader>
        <Flex justify="space-between" align="center">
          <Heading size="sm" textTransform="uppercase">
            Profile
          </Heading>
          <Button variant="solid" colorScheme="blue" fontSize="xs" size="xs">
            Edit
          </Button>
        </Flex>
        <Divider my={2} />
        <div>
          <Avatar
            name="DefalutAvatar"
            // src="./src/assets/DefaultAvatar.svg"
            src={avatar}
            // onError={(e) => {
            //   e.target.onerror = null;
            //   e.target.src = "https://bit.ly/sage-adebayo";
            // }}
            onError={handleAvatarError}
            onClick={onOpen}
          />
        </div>
      </CardHeader>
      <CardBody>
        <Box>
          <Heading size="sm" textTransform="uppercase">
            Preferred Currency
          </Heading>
          <Text fontSize="lg">{preferredCurrency}</Text>
        </Box>
      </CardBody>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Profile</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input type="password" name="password" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Avatar URL</FormLabel>
                <Input type="text" name="avatar" defaultValue={avatar} onChange={(e) => setAvatar(e.target.value)} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Country</FormLabel>
                <Input type="text" name="country" />
              </FormControl>
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
