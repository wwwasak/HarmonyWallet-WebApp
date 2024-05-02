import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";

import SingupCurrenciesSelector from "./SignupCurrenciesSelector.jsx";

export default function SignupCurrency(props) {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <Box p={8} w="300px" mx="auto">
      <Stack spacing={6} textAlign="center">
        <Text fontSize="2xl">Select Your Currency</Text>
        <SingupCurrenciesSelector
          handleChange={props.handleChange}
          setIsSelected={setIsSelected}
        />
        <Flex justify="space-between">
          <Button colorScheme="gray" size="lg" onClick={props.prevStep}>
            Back
          </Button>
          <Button
            colorScheme="blue"
            size="lg"
            onClick={props.nextStep}
            isDisabled={!isSelected}
          >
            Next
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
}
