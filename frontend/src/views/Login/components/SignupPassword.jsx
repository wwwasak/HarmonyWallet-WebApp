import React from 'react';
import { Link } from "react-router-dom";
import { Box, Button, Flex, Input, Stack } from '@chakra-ui/react';

export default function SignupPassword() {
    return (
        <Box p={8} maxW='400px' mx='auto'>
      <Stack spacing={6}>
        <Input variant='filled' placeholder='Enter password' size='lg' />
        <Input variant='filled' placeholder='Confirm password' size='lg' />
        <Flex justify='space-between'>
        <Link to="/signupUsername">
          <Button colorScheme='gray' size='lg'>
            Back
          </Button>
          </Link>
          <Link to="/signupQuestion">
          <Button colorScheme='blue' size='lg'>
            Next
          </Button></Link>
        </Flex>
      </Stack>
    </Box>
    );
  }