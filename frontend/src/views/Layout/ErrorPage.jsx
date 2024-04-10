import { Box, Heading, Text, Flex, Center } from "@chakra-ui/react";
import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";
import NavBar from "../Layout/components/NavBar";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <>
      <NavBar />
      <Center minHeight="80vh">
        <Box
          padding={5}
          bg="green.200"
          width="40%"
          height="250px"
          borderRadius="lg"
        >
          <Flex
            direction="column"
            alignItems="center"
            justifyContent="center"
            height="100%"
          >
            <Heading textAlign="center">Oops</Heading>
            <Text mt={4} textAlign="center">
              {isRouteErrorResponse(error)
                ? "This page does not exist."
                : "An unexpected error occurred."}
            </Text>
            <Link to="/">click here to return to home page</Link>
          </Flex>
        </Box>
      </Center>
    </>
  );
};

export default ErrorPage;
