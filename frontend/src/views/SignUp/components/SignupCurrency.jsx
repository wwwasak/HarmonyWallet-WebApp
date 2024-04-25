import { Box, Button, Flex, Stack } from "@chakra-ui/react";

import SingupCurrenciesSelector from "./SignupCurrenciesSelector.jsx";

export default function SignupCurrency(props) {
  return (
    <Box p={8} w="300px" mx="auto">
      <Stack spacing={6}>
        <h1>Select Your Currency</h1>
        <SingupCurrenciesSelector handleChange={props.handleChange} />
        <Flex justify="space-between">
          <Button colorScheme="gray" size="lg" onClick={props.prevStep}>
            Back
          </Button>
          <Button colorScheme="blue" size="lg" onClick={props.nextStep}>
            Next
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
}
