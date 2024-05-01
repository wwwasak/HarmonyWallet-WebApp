import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

export default function SignupUsername({ username, nextStep, handleChange }) {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const enterUsername = username.length > 0;
  const [message, setMessage] = useState("");

  const checkUsername = async () => {
    setIsLoading(true);
    setMessage("");
    setError(false);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/check-username",
        {
          username: username,
        }
      );
      if (response.data.exists) {
        setError(true);
        setMessage("Username already exists.");
      } else {
        setMessage("Username is available.");
      }
    } catch (error) {
      setError(true);
      if (error.response && error.response.status === 409) {
        setMessage("Username already exists.");
      } else {
        setMessage("Can't connect to the server.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const changeUsername = (e) => {
    if (e.target.value.length > 0) {
      checkUsername();
    } else {
      setError(false);
      setMessage("");
    }
  };

  const handleUsername = (e) => {
    handleChange("username")(e);
    setMessage("");
    setError(false);
  };

  return (
    <Box p={8} maxW="400px" mx="auto">
      <Stack spacing={6}>
        <Text>Enter Username</Text>
        <Input
          variant="filled"
          placeholder="Username"
          size="lg"
          type="text"
          value={username}
          onChange={handleUsername}
          onBlur={changeUsername}
          isDisabled={isLoading}
        />
        <Box h="50px">
          {enterUsername && (
            <Text color={error ? "red.300" : "green.500"}>{message}</Text>
          )}
        </Box>

        <Button
          colorScheme="blue"
          size="lg"
          onClick={nextStep}
          isDisabled={!enterUsername || error || isLoading}
        >
          Next
        </Button>
      </Stack>
    </Box>
  );
}
