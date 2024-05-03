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
  const url = import.meta.env.VITE_CHANGE_BASE_URL;
  const [currentBaseCurrency, setCurrentBaseCurrency] = useState(baseCurrency);
  const [password, setPassword] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleSecurityQuestionChange = (e) => setSecurityQuestion(e.target.value);
  const handleAnswerChange = (e) => setAnswer(e.target.value);
  const handleSubmitPasswordChange = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/change-password', {
        username,
        password,
        security_question: securityQuestion,
        question_answer: answer
      });
      if (response.data) {
        alert('Password updated successfully');
        onClose();
      }
    } catch (error) {
      console.error('Failed to update password:', error);
      alert('Failed to update password: ' + error.message);
    }
  };

  const openModal = (content) => {
    setModalContent(content);
    onOpen();
  };
  
const handleCurrencyChange = async (currentBaseCurrency) => {
  // Ensure this prints a valid token
  const authToken = localStorage.getItem('authToken');
  console.log("New currency selected:", baseCurrency);
  console.log("New currency :", authToken);
  if (!authToken) {
    alert('No authorization token found, please login again.');
    return;
  }
  try {
    const response = await axios.post(url, {
      baseCurrency: currentBaseCurrency
    }, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log(localStorage.getItem('authToken'));  // Ensure this prints a valid token
    if (response.status === 200) {
      alert('Base currency updated successfully');
      onClose();
    } else {
      console.error('Failed to update base currency:', response.status);
      alert('Failed to update base currency');
    }
  } catch (error) {
    console.error('Update error:', error);
    alert('Update error: ' + error.message);
  }
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
      {/* <MenuList>
      <Link href="/forgot-password" ml={3}>Change Password</Link>
        <MenuItem onClick={() => openModal('currency')}>Change Base Currency</MenuItem>
      </MenuList> */}
      <MenuList>
              <MenuItem onClick={() => openModal('currency')}>Change Base Currency</MenuItem>
              <MenuItem onClick={() => openModal('password')}>Change Password</MenuItem>
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
          {/* <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Base Currency</FormLabel>
              <SignupCurrenciesSelector
                selected={currentBaseCurrency}
                onSelect={handleCurrencyChange}
              />
            </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                Save Changes
              </Button>
              <Button variant="ghost" onClick={onClose}>Cancel</Button>
            </ModalFooter> */}
            <ModalBody pb={6}>
            {modalContent === 'currency' && (
              <FormControl>
                <FormLabel>Base Currency</FormLabel>
                <SignupCurrenciesSelector handleChange={handleCurrencyChange} setIsSelected={() => {}} />
              </FormControl>
            )}
            {modalContent === 'password' && (
              <form onSubmit={handleSubmitPasswordChange}>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" value={password} onChange={handlePasswordChange} placeholder="New password" />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Security Question</FormLabel>
                  <Input type="text" value={securityQuestion} onChange={handleSecurityQuestionChange} placeholder="Security Question" />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Answer</FormLabel>
                  <Input type="text" value={answer} onChange={handleAnswerChange} placeholder="Answer" />
                </FormControl>
                <ModalFooter>
                  <Button colorScheme="blue" mr={3} type="submit">Save Changes</Button>
                  <Button variant="ghost" onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </form>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default ProfileCard;