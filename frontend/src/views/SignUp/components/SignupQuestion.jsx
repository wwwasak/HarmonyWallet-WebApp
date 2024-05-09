import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

export default function SignupQuestion(props) {
  const [questionAnswer, setQuestionAnswer] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");

  const handleQuestionChange = (event) => {
    setSecurityQuestion(event.target.value);
    props.handleChange("security_question")(event);
  };

  const handleAnswerChange = (event) => {
    setQuestionAnswer(event.target.value);
    props.handleChange("question_answer")(event);
  };

  const enterAnswer = questionAnswer.length > 0;
  const selectQuestion = securityQuestion.length == 2;

  return (
    <Box p={8} maxW="400px" mx="auto">
      <Stack spacing={6} textAlign="center">
        <Text fontSize="2xl">Select Security Question</Text>
        <Select
          placeholder="Security Questions"
          size="lg"
          value={props.security_question}
          onChange={handleQuestionChange}
        >
          <option value="Q1">What is your mother's maiden name?</option>
          <option value="Q2">What was your first pet's name?</option>
          <option value="Q3">What was the make of your first car?</option>
        </Select>
        <Input
          variant="filled"
          placeholder="Answer"
          size="lg"
          value={props.question_answer}
          onChange={handleAnswerChange}
        />

        <Flex justify="space-between">
          <Button colorScheme="gray" size="lg" onClick={props.prevStep}>
            Back
          </Button>
          <Button
            colorScheme="blue"
            size="lg"
            onClick={props.nextStep}
            isDisabled={!(enterAnswer && selectQuestion)}
          >
            Next
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
}
