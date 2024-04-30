import { Box, Button, Flex, Input, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VerifyNewPassword(props) {
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [typeConfirmPassword, setTypeConfirmPassword] = useState(false);

  const passwordsMatch =
    props.password === confirmPassword &&
    props.password !== "" &&
    confirmPassword !== "";

  const changeConfirmPassword = (e) => {
    if (!typeConfirmPassword) setTypeConfirmPassword(true);
    setConfirmPassword(e.target.value);
  };

  const bothFilled = props.password !== "" && confirmPassword !== "";

  return (
    <Box p={8} maxW="400px" mx="auto">
      <Stack spacing={6}>
        <Text>Enter Password</Text>
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
        {bothFilled ? (
          passwordsMatch ? (
            <Text>Two passwords match</Text>
          ) : (
            <Text color="red.300">Two passwords do not match</Text>
          )
        ) : (
          <Text opacity="0">true</Text>
        )}
        <Flex justify="space-between">
          <Button
            colorScheme="gray"
            size="lg"
            onClick={() => navigate("/login")}
          >
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            size="lg"
            onClick={props.nextStep}
            isDisabled={!bothFilled || !passwordsMatch}
          >
            Next
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
}
