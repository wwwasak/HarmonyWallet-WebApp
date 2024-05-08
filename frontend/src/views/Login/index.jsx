import { Grid, GridItem, Center } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";

import { useNavigation } from "../../stores/RouterNavigationContext.jsx";
import AppInfo from "./components/AppInfo";
import LoginBox from "./components/LoginBox";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigation();
  const loginUrl = import.meta.env.VITE_LOGIN_SERVER_URL;
  const validateTokenUrl = import.meta.env.VITE_GET_USER_INFO_URL;
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const validateToken = async () => {
      if (!authToken) return;
      try {
        await axios.post(
          validateTokenUrl,
          {},
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );
        navigate("/");
      } catch (error) {
        console.error("Token validation error:", error);
        localStorage.removeItem("authToken");
      }
    };

    validateToken();
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const response = await axios.post(loginUrl, { username, password });

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("authToken", token);

        // alert("Login successfully ");
        navigate("/");
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
    <Grid
      templateColumns={"1.5fr 2fr"}
      gap={0}
      backgroundImage="url('./pictures/background.jpg')"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
    >
      <GridItem
        w="100%"
        h="100vh"
        alignContent={"center"}
        bg="rgba(255, 255, 255, 0.5)"
        backdropFilter="blur(10px)"
      >
        <Center>
          <AppInfo></AppInfo>
        </Center>
      </GridItem>

      <GridItem w="100%" h="100vh" alignContent={"center"}>
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
