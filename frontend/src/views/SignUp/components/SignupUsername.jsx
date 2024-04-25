import { Box, Button, Input, Stack } from "@chakra-ui/react";

export default function SignupUsername(props) {
  console.log(props.username);
  return (
    <Box p={8} maxW="400px" mx="auto">
      <Stack spacing={6}>
        <h1>Enter Username</h1>
        <Input
          variant="filled"
          placeholder="Username"
          size="lg"
          type="text"
          value={props.username}
          onChange={props.handleChange("username")}
        />
        <Button colorScheme="blue" size="lg" onClick={props.nextStep}>
          Next
        </Button>
      </Stack>
    </Box>
  );
}
