import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Flex,
  Divider,
  Box,
  Link,
} from "@chakra-ui/react";
import { parseISO, format } from "date-fns";

const RecentRecordsCard = ({ gridArea, exchanges = [] }) => {
  const formattedExchanges = exchanges.map((exchange) => ({
    ...exchange,
    date: format(parseISO(exchange.date), "MM-dd-yyyy"),
  }));

  return (
    <Card gridArea={gridArea}>
      <CardHeader>
        <Flex justifyContent="space-around" alignItems="center">
          <Heading size="sm" textTransform="uppercase">
            Exchange Records
          </Heading>
          <Link>More</Link>
        </Flex>
        <Divider my={2} />
      </CardHeader>
      <CardBody>
        {formattedExchanges.length > 0 ? (
          formattedExchanges.map((exchange, index) => (
            <Box key={index} my={2}>
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
