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

  const sortedExchanges = formattedExchanges.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  ); // Sorting exchanges by date in descending order

  const displayedExchanges = sortedExchanges.slice(0, 5);

  return (
    <Card gridArea={gridArea} h={473}>
      <CardHeader>
        <Flex justifyContent="space-around" alignItems="center">
          <Heading size="sm" textTransform="uppercase">
            Last 5 Exchange Records
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
        {displayedExchanges.length > 0 ? (
          displayedExchanges.map((exchange, index) => (
            <Box key={index} my={2} borderBottom="1px" p="5px">
              {exchange.date} - From {exchange.fromAmount}{" "}
              {exchange.fromCurrency} to {exchange.toAmount}{" "}
              {exchange.toCurrency}
            </Box>
          ))
        ) : (
          <Box
            style={{ color: "rgba(128, 128, 128, 0.75)" }}
            fontStyle={"italic"}
          >
            You have no exchange records. Click on the '+' icon at the bottom
            right of the page to start recording!
          </Box>
        )}
      </CardBody>
    </Card>
  );
};

export default RecentRecordsCard;
