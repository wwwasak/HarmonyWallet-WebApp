import {
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  Stack,
  Container,
} from "@chakra-ui/react";
import logo from "../../../assets/logo.webp";

const AppInfo = () => {
  return (
    <Card>
      <CardBody>
        <Stack spacing={6}>
          <Flex justifyContent="space-around" alignItems="center">
            <Image src={logo} boxSize="50px" objectFit="cover"></Image>
            <Heading fontSize="2xl">Exchange flow</Heading>
          </Flex>
          <Container w="300px" h="150px" bg="yellow.100">
            Our first group project
          </Container>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default AppInfo;
