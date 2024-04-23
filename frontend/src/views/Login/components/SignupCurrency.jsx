import React from 'react';
import { Link } from "react-router-dom";
import { Box, Button, Flex, Input, Select, Stack } from '@chakra-ui/react';

export default function SignupQuestion() {
    return (
        <Box p={8} maxW='400px' mx='auto'>
      <Stack spacing={6}>
        <Select placeholder='Select your case currency' size='lg'>
          <option value='C1'>C1</option>
          <option value='C2'>C2</option>
          <option value='C3'>C3</option>
        </Select>
        <Flex justify='space-between'>
        <Link to="/signupQuestion">
          <Button colorScheme='gray' size='lg'>
            Back
          </Button></Link>
          <Link to="/login">
          <Button colorScheme='blue' size='lg'>
            Next
          </Button></Link>
        </Flex>
      </Stack>
    </Box>
    );
  }
  