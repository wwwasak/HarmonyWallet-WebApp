import React from 'react';
import { Link } from "react-router-dom";
import { Box, Button, Flex, Input, Select, Stack } from '@chakra-ui/react';

export default function SignupQuestion() {
    return (
        <Box p={8} maxW='400px' mx='auto'>
      <Stack spacing={6}>
        <Select placeholder='Select security question' size='lg'>
          <option value='Q1'>Q1</option>
          <option value='Q2'>Q2</option>
          <option value='Q3'>Q2</option>
        </Select>
        <Input variant='filled' placeholder='Answer' size='lg' />
        
        <Flex justify='space-between'>
        <Link to="/signupPassword">
          <Button colorScheme='gray' size='lg'>
            Back
          </Button></Link>
          <Link to="/signupCurrency">
          <Button colorScheme='blue' size='lg'>
            Next
          </Button></Link>
        </Flex>
      </Stack>
    </Box>
    );
  }
  