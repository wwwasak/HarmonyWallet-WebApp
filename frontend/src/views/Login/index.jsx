import { Grid, GridItem, Center } from "@chakra-ui/react";
import AppInfo from "./components/AppInfo";
import LoginBox from "./components/LoginBox";

const Login = () => {
  return (
    <Grid templateColumns={"1.5fr 2fr"} gap={0}>
      <GridItem w="100%" h="100vh" bg="yellow.100" alignContent={"center"}>
        <Center>
          <AppInfo></AppInfo>
        </Center>
      </GridItem>

      <GridItem w="100%" h="100vh" bg="orange.200" alignContent={"center"}>
        <LoginBox></LoginBox>
      </GridItem>
    </Grid>
  );
};

export default Login;
