import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

export default function SignupUsername({ username, nextStep, handleChange }) {
  const [error, setError] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [enterUsername, setEnterUsername] = useState(false);
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
      setEnterUsername(true);
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
      <Stack spacing={6} textAlign="center">
        <Text fontSize="2xl">Enter Username</Text>
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
        <Box>
          <Box h="30px">
            {enterUsername && (
              <Text color={error ? "red.300" : "green.500"}>{message}</Text>
            )}
          </Box>

          <Button
            colorScheme="blue"
            size="lg"
            onClick={() => {
              nextStep();
              setError(true);
            }}
            isDisabled={!enterUsername || error || isLoading}
          >
            Next
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
