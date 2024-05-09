import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ResultOfChangePassword(props) {
  const navigate = useNavigate();
  const [isResponded, setIsResponded] = useState(false);
  const [message, setMessage] = useState("Registering...");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await props.changePassword();
        setIsResponded(true);
        setMessage("Change successful");

        setTimeout(() => navigate("/login"), 3000);
      } catch (error) {
        setIsResponded(true);

        if (error.response) {
          switch (error.response.status) {
            case 401:
              setMessage("Security info does not match.");
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
        <Text>Change Password Result</Text>
        <Box>
          {isResponded ? (
            <Text>{message}</Text>
          ) : (
            <Text>Changing Password...</Text>
          )}
        </Box>

        <Button colorScheme="blue" size="lg" onClick={() => navigate("/login")}>
          Go to Login
        </Button>
      </Stack>
    </Box>
  );
}
