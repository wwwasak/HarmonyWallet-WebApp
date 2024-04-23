import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, Input, Stack } from "@chakra-ui/react";

export default function SignupUsername() {
  return (
    <Card p={8} maxW="400px" mx="auto">
      <Stack spacing={6}>
        <Input variant="filled" placeholder="Username" size="lg" />
        <Link to="/signup/password">
          <Button colorScheme="blue" size="lg">
            Next
          </Button>
        </Link>
      </Stack>
    </Card>
  );
}
