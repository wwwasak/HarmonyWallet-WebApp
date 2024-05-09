import { Box, Heading, Text, Flex, Center } from "@chakra-ui/react";
import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";
import NavBar from "../Layout/components/NavBar";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <>
      <NavBar />
      <Center
        minHeight="80vh"
        backgroundImage="url('./pictures/background.jpg')"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        ml={8}
        mr={8}
        borderRadius={20}
      >
        <Box
          padding={5}
          width="40%"
          height="250px"
          borderRadius="lg"
          bg="rgba(255, 255, 255, 0.5)"
          backdropFilter="blur(10px)"
        >
          <Flex
            direction="column"
            alignItems="center"
            justifyContent="center"
            height="100%"
          >
            <Heading textAlign="center" color="red.400">
              Oops
            </Heading>
            <Text mt={4} textAlign="center" color="red.400">
              {isRouteErrorResponse(error)
                ? "This page does not exist."
                : "An unexpected error occurred."}
            </Text>
            <Link to="/">➡︎click here to return to home page⬅︎</Link>
          </Flex>
        </Box>
      </Center>
    </>
  );
};

export default ErrorPage;
