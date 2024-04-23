import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Flex, Input, Select, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function SignupQuestion() {
  const navigate = useNavigate();
  return (
    <Box p={8} maxW="400px" mx="auto">
      <Stack spacing={6}>
        <Select placeholder="Select your case currency" size="lg">
          <option value="C1">C1</option>
          <option value="C2">C2</option>
          <option value="C3">C3</option>
        </Select>
        <Flex justify="space-between">
          <Link to="/signup/question">
            <Button colorScheme="gray" size="lg">
              Back
            </Button>
          </Link>

          <Button
            colorScheme="blue"
            size="lg"
            onClick={() => navigate("/login")}
          >
            Next
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
}
