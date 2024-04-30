import {
  Box,
  Card,
  CardBody,
  Stack,
  Input,
  Button,
  Link,
  ButtonGroup,
  Flex,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const LoginBox = (props) => {
  const navigate = useNavigate();
  const setUsername = props.setUsername;
  const setPassword = props.setPassword;
  const handleLogin = props.handleLogin;

  return (
    <Box>
      <Flex justifyContent="center">
        <Card h="100%" w="50%">
          <CardBody>
            <Stack spacing={6}>
              <Input
                variant="filled"
                placeholder="Username"
                size="lg"
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                variant="filled"
                placeholder="Password"
                size="lg"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Link href="/forgot-password">forgot password</Link>
              <ButtonGroup gap="20">
                <Button h="50px" w="180px" onClick={() => navigate("/signup")}>
                  Sign Up
                </Button>
                <Button h="50px" w="180px" onClick={handleLogin}>
                  Log In
                </Button>
              </ButtonGroup>
            </Stack>
          </CardBody>
        </Card>
      </Flex>
    </Box>
  );
};

export default LoginBox;
