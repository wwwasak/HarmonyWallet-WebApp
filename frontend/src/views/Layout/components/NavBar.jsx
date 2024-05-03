import { Grid, GridItem, HStack, Image, Text, Button } from "@chakra-ui/react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../../assets/logo.webp";
import { useLoginStatus } from "../../../stores/RequireAuthContext";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginStatus } = useLoginStatus();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    alert("Logout successfully");
    navigate("/login");
  };

  const isActive = (paths) => {
    return paths.some((path) => {
      if (path === "/") {
        return location.pathname === path;
      } else {
        return (
          location.pathname.startsWith(path + "/") || location.pathname === path
        );
      }
    });
  };

  return (
    <>
      <Grid
        templateAreas={{
          base: `"left right" "middle middle"`,
          lg: `"left middle right"`,
        }}
        templateColumns={{
          base: "1fr 1fr",
          lg: "1fr 2fr 1fr",
        }}
        templateRows={{
          base: "auto auto",
          lg: "auto",
        }}
        alignItems="center"
        margin={3}
        rowGap={5}
      >
        <GridItem area="left">
          <Link to="/">
            <HStack>
              <Image src={logo} boxSize="60px" objectFit="cover" />
              <Text fontSize="xl" fontWeight="bold">
                Exchange Flow
              </Text>
            </HStack>
          </Link>
        </GridItem>

        <GridItem area="middle">
          <HStack justifyContent="center">
            <Link to="/">
              <Button
                fontSize="lg"
                colorScheme={
                  isActive(["/", "/income", "/expense", "/exchange"])
                    ? "blue"
                    : "gray"
                }
              >
                Record
              </Button>
            </Link>
            <Link to="/exchangeoverview">
              <Button
                fontSize="lg"
                colorScheme={
                  isActive(["/exchangeoverview", "/ratesDetail"])
                    ? "blue"
                    : "gray"
                }
              >
                Currency
              </Button>
            </Link>
          </HStack>
        </GridItem>

        <GridItem area="right" justifySelf="end">
          {loginStatus ? (
            <Button onClick={handleLogout}>Logout</Button>
          ) : (
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          )}
        </GridItem>
      </Grid>
    </>
  );
};

export default NavBar;
