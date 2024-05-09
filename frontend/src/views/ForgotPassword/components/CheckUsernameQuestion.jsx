import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function CheckUsernameQuestion(props) {
  const navigate = useNavigate();
  const [isResponded, setIsResponded] = useState(false);
  const [message, setMessage] = useState("Registering...");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await props.checkUsernameQuestion();
        setIsResponded(true);
        setMessage("Your information is correct!");
        setIsSuccess(true);
        setTimeout(() => props.setStep(props.step + 1), 3000);
      } catch (error) {
        setIsResponded(true);
        setIsSuccess(false);
        if (error.response) {
          switch (error.response.status) {
            case 400:
              setMessage("Info is required.");
              break;
            case 409:
              setMessage("Info does not match.");
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
      <Stack spacing={6}>
        <Text>Check Info Result</Text>
        <Box>
          {isResponded ? (
            <Text>{message}</Text>
          ) : (
            <Text>Cheking Information...</Text>
          )}
        </Box>
        {isResponded && isSuccess ? (
          <Button
            colorScheme="blue"
            size="lg"
            onClick={() => props.setStep(props.step + 1)}
          >
            Go change password
          </Button>
        ) : (
          <Button
            colorScheme="blue"
            size="lg"
            onClick={() => navigate("/login")}
          >
            Go to Login
          </Button>
        )}
      </Stack>
    </Box>
  );
}
