import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Flex,
  Divider,
  Box,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import { parseISO, format } from "date-fns";
import { Link as RouterLink } from "react-router-dom";
const RecentRecordsCard = ({ gridArea, exchanges = [] }) => {
  const linkColor = useColorModeValue("blue.500", "blue.200");
  const formattedExchanges = exchanges?.map((exchange) => ({
    ...exchange,
    date: format(parseISO(exchange.date), "MM-dd-yyyy"),
  }));

  return (
    <Card gridArea={gridArea} h={473}>
      <CardHeader>
        <Flex justifyContent="space-around" alignItems="center">
          <Heading size="sm" textTransform="uppercase">
            Exchange Records
          </Heading>
          <Link
            as={RouterLink}
            to="/exchange"
            color={linkColor}
            textDecoration="underline"
            _hover={{ textDecoration: "none" }}
          >
            More
          </Link>
        </Flex>
        <Divider my={2} />
      </CardHeader>
      <CardBody>
        {formattedExchanges.length > 0 ? (
          formattedExchanges.map((exchange, index) => (
            <Box key={index} my={2} borderBottom="1px" p="5px">
              {exchange.date} - From {exchange.fromAmount}{" "}
              {exchange.fromCurrency} to {exchange.toAmount}{" "}
              {exchange.toCurrency}
            </Box>
          ))
        ) : (
          <Box>No exchange records available.</Box>
        )}
      </CardBody>
    </Card>
  );
};

export default RecentRecordsCard;
