import { Grid, GridItem, Center } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

import AppInfo from "./components/AppInfo";
import LoginBox from "./components/LoginBox";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const url = import.meta.env.VITE_LOGIN_SERVER_URL;
  const body = {
    username: username,
    password: password,
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(url, body);

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("authToken", token);

        alert("Login successfully ");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          alert("Username or Password is not correct");
        } else {
          alert("Error: " + error.response.data);
        }
      }
    }
  };

  return (
    <Grid templateColumns={"1.5fr 2fr"} gap={0}>
      <GridItem w="100%" h="100vh" bg="yellow.100" alignContent={"center"}>
        <Center>
          <AppInfo></AppInfo>
        </Center>
      </GridItem>

      <GridItem w="100%" h="100vh" bg="orange.200" alignContent={"center"}>
        <LoginBox
          handleLogin={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword}
        ></LoginBox>
      </GridItem>
    </Grid>
  );
};

export default Login;
