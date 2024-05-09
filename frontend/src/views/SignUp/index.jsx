import { Box, Card, Flex, Stack } from "@chakra-ui/react";
import { useState, useCallback } from "react";
import axios from "axios";

import SignupUsername from "./components/SignupUsername";
import SignupPassword from "./components/SignupPassword";
import SignupQuestion from "./components/SignupQuestion";
import SignupCurrency from "./components/SignupCurrency";
import SignupResult from "./components/SignupResult";

const Signup = () => {
  const [step, setStep] = useState(1);
  const [signUpInfo, setSignUpInfo] = useState({
    username: "",
    password: "",
    security_question: "",
    question_answer: "",
    base_currency: "",
    notification: [],
    favourite_currency: [],
  });
  const url = import.meta.env.VITE_SIGNUP_SERVER_URL;

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

  const sendInfoToServer = async () => {
    try {
      const response = await axios.post(url, signUpInfo);
      return response;
    } catch (error) {
      if (error.response && error.response.status === 409) {
        console.error("Username already exists.");
      } else {
        console.error("Failed to communicate with the server.");
      }
      throw error;
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <SignupUsername
            nextStep={nextStep}
            handleChange={handleChange}
            username={signUpInfo.username}
          />
        );
      case 2:
        return (
          <SignupPassword
            nextStep={nextStep}
            prevStep={prevStep}
            handleChange={handleChange}
            password={signUpInfo.password}
          />
        );
      case 3:
        return (
          <SignupQuestion
            nextStep={nextStep}
            prevStep={prevStep}
            handleChange={handleChange}
            security_question={signUpInfo.security_question}
            question_answer={signUpInfo.question_answer}
          />
        );
      case 4:
        return (
          <SignupCurrency
            nextStep={nextStep}
            prevStep={prevStep}
            handleChange={handleChange}
            base_currency={signUpInfo.base_currency}
          />
        );
      default:
        return <SignupResult sendInfoToServer={sendInfoToServer} />;
    }
  };

  return (
    <Box
      w="100%"
      h="100vh"
      backgroundImage="url('./pictures/background.jpg')"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
    >
      <Flex
        justifyContent="center"
        alignItems="center"
        h="100vh"
        bg="rgba(255, 255, 255, 0.5)"
        backdropFilter="blur(10px)"
      >
        <Card p={8} w="500px" h="400px" mx="auto" justifyContent="center">
          <Stack spacing={6}>{renderStep()}</Stack>
        </Card>
      </Flex>
    </Box>
  );
};

export default Signup;
