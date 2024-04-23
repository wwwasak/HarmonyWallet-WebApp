import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Flex,
  Divider,
  Box,
} from "@chakra-ui/react";

const RecentRecordsCard = ({ gridArea }) => {
  return (
    <Card gridArea={gridArea}>
      <CardHeader>
        <Flex justifyContent="center" alignItems="center">
          <Heading size="sm" textTransform="uppercase">
            RecentRecords
          </Heading>
        </Flex>
        <Divider my={2} />
      </CardHeader>
      <CardBody>
        <Box>records1 17/04/2024</Box>
        <Divider my={12} />
        <Box>records2 15/04/2024</Box>
        <Divider my={12} />
        <Box>records3 1/04/2024</Box>
      </CardBody>
    </Card>
  );
};

export default RecentRecordsCard;
