import {
  Box,
  Card,
  Flex,
  CardHeader,
  Heading,
  Button,
  Divider,
  Avatar,
  CardBody,
  Text,
} from "@chakra-ui/react";

const ProfileCard = ({ gridArea, preferredCurrency }) => {
  return (
    <Card gridArea={gridArea}>
      <CardHeader>
        <Flex justify="space-between" align="center">
          <Heading size="sm" textTransform="uppercase">
            Profile
          </Heading>
          <Button variant="solid" colorScheme="blue" fontSize="xs" size="xs">
            Edit
          </Button>
        </Flex>
        <Divider my={2} />
        <div>
          <Avatar
            name="DefalutAvatar"
            src="./src/assets/DefaultAvatar.svg"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://bit.ly/sage-adebayo";
            }}
          />
        </div>
      </CardHeader>
      <CardBody>
        <Box>
          <Heading size="sm" textTransform="uppercase">
            Preferred Currency
          </Heading>
          <Text fontSize="lg">{preferredCurrency}</Text>
        </Box>
      </CardBody>
    </Card>
  );
};

export default ProfileCard;
