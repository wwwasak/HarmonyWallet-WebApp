import { Box, Button, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function SignupResult(props) {
  const navigate = useNavigate();
  const [isResponded, setIsResponded] = useState(false);
  useEffect(() => {
    const response = props.sendInfoToServer();
    console.log(response);
  });

  return (
    <Box p={8} maxW="400px" mx="auto">
      <Stack spacing={6}>
        <h1>Sign Up Result</h1>
        <Box>
          {isResponded ? <Box> result</Box> : <Box>waiting result</Box>}
        </Box>
        <Button colorScheme="blue" size="lg" onClick={() => navigate("/login")}>
          Back to Login
        </Button>
      </Stack>
    </Box>
  );
}
