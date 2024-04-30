import { Grid, GridItem, Center } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import axios from "axios";

import AppInfo from "./components/AppInfo";
import LoginBox from "./components/LoginBox";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const url = "http://localhost:3000/login";
  // const body = {
  //   username: username,
  //   password: password,
  // };

  // const handleLogin = async () => {
  //   const response = await axios.post(url, body);
  //   alert(response.data); 
  // };

 //acquire and store userId
 const handleLogin = async () => {
  try {
    const url = 'http://localhost:3000/api/login';
    const body = { username, password };
    const response = await axios.post(url, body);
    if (response.data.userId) {
      localStorage.setItem('userId', response.data.userId); // Store userId on successful login
      alert('Login successful');
    } else {
      // Handle different responses or errors
      alert('Login failed: ' + (response.data.message || 'Unknown error'));
    }
  } catch (error) {
    alert('Login error: ' + (error.response?.data?.message || error.message));
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
