import React from 'react';
import { Link } from "react-router-dom";
import { Box, Button, Input, Stack } from '@chakra-ui/react';

export default function SignupUsername() {
    return (
        <Box p={8} maxW='400px' mx='auto'>
      <Stack spacing={6}>
        <Input variant='filled' placeholder='Username' size='lg' />
        <Link to="/signupPassword">
        <Button colorScheme='blue' size='lg'>
          Next
        </Button>
        </Link>
      </Stack>
    </Box>
    );
  }
  