import { Box, Card, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const Signup = () => {
  return (
    <Box w="100%" h="1000px" bg="pink.100">
      <Flex justifyContent="center">
        <Card>
          <Outlet />
        </Card>
      </Flex>
    </Box>
  );
};

export default Signup;
