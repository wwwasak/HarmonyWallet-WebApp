import React from 'react';
import { Link } from "react-router-dom";
import { Text, Button, ButtonGroup, Card, CardBody, CardFooter, Flex, Grid, GridItem, Heading, Image, Input, Stack } from '@chakra-ui/react';
import logo from "../../../assets/logo.webp";

const LoginPage = () => {
  return (
    <Grid 
      templateAreas={`"logo webApp box"
                      "intro intro box"`}
      gridTemplateRows={'1fr 2fr'}
      gridTemplateColumns={'1fr 1fr 3fr'}
      h='100vh'
      
      color='blackAlpha.700'
      fontWeight='bold'
    >
      <GridItem pl='2' area={'logo'} py='50px' bg='blue.200'>
        <Image src={logo} boxSize="50px" objectFit="cover" />
      </GridItem>
      <GridItem pl='2' area={'webApp'} py='50px' bg='blue.200'>
        <Heading fontSize="2xl">Exchange flow</Heading>
        <Text></Text>
      </GridItem>
      <GridItem pl='2' area={'intro'} bg='blue.200'>
        <Heading>Introduction here</Heading>
        <Text>Our first group project</Text>
      </GridItem>
      <GridItem pl='2' bg='blue.200' area={'box'} justifyContent="center" alignItems='center'>
        <Card h="100%">
          <CardBody>
            <Stack spacing={6}>
              <Input variant='filled' placeholder='Username' size='lg' />
              <Input variant='filled' placeholder='Password' size='lg' />
            </Stack>
          </CardBody>
          <CardFooter justifyContent="center" alignItems="flex-end">
  <Flex justifyContent="flex-end" alignItems="center" flexDirection="column">
    <Link to="/signupUsername" variant="underline">Forgot password?click here</Link>
    <ButtonGroup mt={2}>
    <Link to="/signupUsername">
      <Button variant='solid' colorScheme='blue' h='100px' w='200px'>
        Sign Up
      </Button></Link>
      <Button variant='solid' colorScheme='blue' h='100px' w='200px'>
        Log In
      </Button>
    </ButtonGroup>
  </Flex>
</CardFooter>

        </Card>
      </GridItem>
    </Grid>
  );
};

export default LoginPage;
