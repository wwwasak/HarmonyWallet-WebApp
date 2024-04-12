import React from 'react';
import { Box, Button, Flex, Input, Stack } from '@chakra-ui/react';

export default function SignupPassword() {
    return (
        <Box p={8} maxW='400px' mx='auto'>
      <Stack spacing={6}>
        <Input variant='filled' placeholder='Old password' size='lg' />
        <Input variant='filled' placeholder='New password' size='lg' />
        <Input variant='filled' placeholder='Confirm password' size='lg' />
        <Flex justify='space-between'>
          <Button colorScheme='gray' size='lg'>
            Back
          </Button>
          <Button colorScheme='blue' size='lg'>
            Next
          </Button>
        </Flex>
      </Stack>
    </Box>
    );
  }