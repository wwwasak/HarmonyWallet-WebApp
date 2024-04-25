import { Box, Button, Input, Stack } from "@chakra-ui/react";
import React from "react";

function SignupUsername({ username, nextStep, handleChange }) {
  console.log(username);
  return (
    <Box p={8} maxW="400px" mx="auto">
      <Stack spacing={6}>
        <h1>Enter Username</h1>
        <Input
          variant="filled"
          placeholder="Username"
          size="lg"
          type="text"
          value={username}
          onChange={handleChange("username")}
        />
        <Button colorScheme="blue" size="lg" onClick={nextStep}>
          Next
        </Button>
      </Stack>
    </Box>
  );
}

export default SignupUsername;
