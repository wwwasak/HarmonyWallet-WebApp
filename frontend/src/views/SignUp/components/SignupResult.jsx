import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function SignupResult(props) {
  const navigate = useNavigate();
  const [isResponded, setIsResponded] = useState(false);
  const [message, setMessage] = useState("Registering...");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await props.sendInfoToServer();
        setIsResponded(true);
        setMessage("Registration successful!");
        setIsSuccess(true);
        setTimeout(() => navigate("/login"), 3000);
      } catch (error) {
        setIsResponded(true);
        setIsSuccess(false);
        if (error.response) {
          switch (error.response.status) {
            case 400:
              setMessage("Username and password are required.");
              break;
            case 409:
              setMessage("Username already exists.");
              break;
            case 500:
              setMessage("Server error, please try again.");
              break;
            default:
              setMessage("Something wrong, please try again later.");
          }
        } else {
          setMessage("Newtwork error, please try again.");
        }
        setTimeout(() => navigate("/login"), 3000);
      }
    };

    fetchData();
  }, [navigate, props]);

  return (
    <Box p={8} maxW="400px" mx="auto">
      <Stack spacing={6} textAlign="center">
        <Text fontSize="2xl">Sign Up Result</Text>
        <Box>
          {isResponded ? <Text>{message}</Text> : <Text>Registering...</Text>}
        </Box>
        <Button colorScheme="blue" size="lg" onClick={() => navigate("/login")}>
          Back to Login
        </Button>
      </Stack>
    </Box>
  );
}
