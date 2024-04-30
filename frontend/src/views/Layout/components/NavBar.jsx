import { Grid, GridItem, HStack, Image, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.webp";
import React from "react";
import userImage from "../../../assets/userImage.webp";

const NavBar = () => {
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
          <HStack>
            <Image src={logo} boxSize="60px" objectFit="cover" />
            <Text fontSize="xl" fontWeight="bold">
              Exchange Flow
            </Text>
          </HStack>
        </GridItem>

        <GridItem area="middle">
          <HStack justifyContent="center">
            <Link to="/">
              <Button fontSize="lg">Record</Button>
            </Link>
            <Link to="/exchangeoverview">
              <Button fontSize="lg">Currency</Button>
            </Link>
          </HStack>
        </GridItem>

        <GridItem area="right" justifySelf="end">
          <Link to="/user">
            <Image src={userImage} boxSize="60px" objectFit="cover" />
          </Link>
        </GridItem>
      </Grid>
    </>
  );
};

export default NavBar;
