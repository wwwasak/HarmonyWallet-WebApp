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

const LoginBox = () => {
  return (
    <Box>
      <Flex justifyContent="center">
        <Card h="100%" w="50%">
          <CardBody>
            <Stack spacing={6}>
              <Input variant="filled" placeholder="Username" size="lg" />
              <Input variant="filled" placeholder="Password" size="lg" />
              <Link>forgot password</Link>
              <ButtonGroup gap="20">
                <Button h="50px" w="180px">
                  Sign Up
                </Button>
                <Button h="50px" w="180px">
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
