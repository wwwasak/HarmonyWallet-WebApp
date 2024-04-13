import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react";

export const Amount = ({ input, onInputChange }) => {
  const isError = input === "";

  return (
    <FormControl isInvalid={isError}>
      <Input
        type="number"
        value={input}
        onChange={onInputChange}
        placeholder={100}
      />
      {!isError ? (
        <FormHelperText></FormHelperText>
      ) : (
        <FormErrorMessage>Please enter a valid amount.</FormErrorMessage>
      )}
    </FormControl>
  );
};

export default Amount;
