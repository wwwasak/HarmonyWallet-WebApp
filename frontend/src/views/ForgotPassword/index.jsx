import { Box, Card, Flex, Stack } from "@chakra-ui/react";
import { useState, useCallback } from "react";
import axios from "axios";

import VerifyUsername from "./components/VerifyUsername";
import VerifyNewPassword from "./components/VerifyNewPassword";
import VerifySecurityQuestion from "./components/VerifySecurityQuestion";
import CheckUsernameQuestion from "./components/CheckUsernameQuestion";
import ResultOfChangePassword from "./components/ResultOfChangePassword";

const Signup = () => {
  const [step, setStep] = useState(1);
  const [signUpInfo, setSignUpInfo] = useState({
    username: "",
    password: "",
    security_question: "",
    question_answer: "",
  });
  const url = import.meta.env.VITE_CHECK_USERNAME_QUESTION_URL;
  const changePasswordUrl = import.meta.env.VITE_CHANGE_PASSWORD_URL;

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleChange = useCallback(
    (input) => (e) => {
      setSignUpInfo((prevState) => ({ ...prevState, [input]: e.target.value }));
    },
    []
  );

  const checkUsernameQuestion = async () => {
    try {
      const response = await axios.post(url, signUpInfo);
      return response;
    } catch (error) {
      if (error.response && error.response.status === 409) {
        console.error("User does not exist.");
      } else {
        console.error("Failed to communicate with the server.");
      }
      throw error;
    }
  };

  const changePassword = async () => {
    try {
      const response = await axios.post(changePasswordUrl, signUpInfo);
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <VerifyUsername
            nextStep={nextStep}
            handleChange={handleChange}
            username={signUpInfo.username}
          />
        );
      case 2:
        return (
          <VerifySecurityQuestion
            nextStep={nextStep}
            prevStep={prevStep}
            handleChange={handleChange}
            security_question={signUpInfo.security_question}
            question_answer={signUpInfo.question_answer}
          />
        );
      case 3:
        return (
          <CheckUsernameQuestion
            nextStep={nextStep}
            prevStep={prevStep}
            checkUsernameQuestion={checkUsernameQuestion}
            setStep={setStep}
            step={step}
          />
        );
      case 4:
        return (
          <VerifyNewPassword
            nextStep={nextStep}
            handleChange={handleChange}
            password={signUpInfo.password}
          />
        );
      case 5:
        return <ResultOfChangePassword changePassword={changePassword} />;
      default:
        return <ChangePassword changePassword={changePassword} />;
    }
  };

  return (
    <Box w="100%" h="100vh" bg="pink.100">
      <Flex justifyContent="center" alignItems="center" h="100vh">
        <Card p={8} w="500px" h="400px" mx="auto">
          <Stack spacing={6}>{renderStep()}</Stack>
        </Card>
      </Flex>
    </Box>
  );
};

export default Signup;
