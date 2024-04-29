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
  const [avatarFile, setAvatarFile] = useState(null);

  const handleAvatarError = (e) => {
    e.target.onerror = null;
    e.target.src = "https://bit.ly/sage-adebayo"; // Fallback avatar if error
  };
  
  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('password', event.target.password.value);
    formData.append('avatar', avatarFile);
    formData.append('country', event.target.country.value);

    // Here you would send formData to the server
    console.log('Data ready to be sent:', formData); // Just a placeholder
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
                <FormLabel>Avatar</FormLabel>
                <Input type="file" name="avatar" accept="image/*" onChange={handleAvatarChange} />
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
