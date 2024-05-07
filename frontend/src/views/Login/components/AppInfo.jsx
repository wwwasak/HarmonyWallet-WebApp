import {
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  Container,
} from "@chakra-ui/react";
import wallet from "/pictures/wallet.webp";

const AppInfo = () => {
  return (
    <Card>
      <CardBody>
        <Stack spacing={6}>
          <Flex justifyContent="space-around" alignItems="center">
            <Image src={wallet} boxSize="50px" objectFit="cover"></Image>
            <Heading
              fontSize="2xl"
              bgGradient="linear(to-r, green.600, yellow.800)"
              bgClip="text"
            >
              HarmonyWallet
            </Heading>
          </Flex>
          <Container w="300px" h="150px">
            <Text as="i" fontSize="xl">
              Navigate Your Finances Across Borders: Record, Spend, Convert with
              Ease!
            </Text>
          </Container>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default AppInfo;
