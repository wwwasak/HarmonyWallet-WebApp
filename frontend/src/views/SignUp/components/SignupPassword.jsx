import { Box, Button, Flex, Input, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";

export default function SignupPassword(props) {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [typeConfirmPassword, setTypeConfirmPassword] = useState(false);

  const passwordsMatch = props.password === confirmPassword;

  const changeConfirmPassword = (e) => {
    if (!typeConfirmPassword) setTypeConfirmPassword(true);
    setConfirmPassword(e.target.value);
  };

  return (
    <Box p={8} maxW="400px" mx="auto">
      <Stack spacing={6}>
        <h1>Enter Password</h1>
        <Input
          variant="filled"
          placeholder="Enter password"
          size="lg"
          type="password"
          value={props.password}
          onChange={props.handleChange("password")}
        />
        <Input
          variant="filled"
          placeholder="Confirm password"
          size="lg"
          type="password"
          value={confirmPassword}
          onChange={changeConfirmPassword}
        />
        {typeConfirmPassword ? (
          passwordsMatch ? (
            <Text color="red.300">Two passwords match</Text>
          ) : (
            <Text color="red.300">Two passwords do not match</Text>
          )
        ) : (
          <Text color="clear.300">true</Text>
        )}
        <Flex justify="space-between">
          <Button colorScheme="gray" size="lg" onClick={props.prevStep}>
            Back
          </Button>
          <Button
            colorScheme="blue"
            size="lg"
            onClick={props.nextStep}
            isDisabled={!passwordsMatch}
          >
            Next
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
}
