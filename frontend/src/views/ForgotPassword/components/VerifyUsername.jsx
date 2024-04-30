import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";

export default function VerifyUsername({ username, nextStep, handleChange }) {
  const enterUsername = username.length > 0;

  const handleUsername = (e) => {
    handleChange("username")(e);
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
        />
        <Button
          colorScheme="blue"
          size="lg"
          onClick={nextStep}
          isDisabled={!enterUsername}
        >
          Next
        </Button>
      </Stack>
    </Box>
  );
}
