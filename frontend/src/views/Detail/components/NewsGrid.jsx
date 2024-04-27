import { Box, Card, CardBody, Heading } from "@chakra-ui/react";
import React from "react";
import NewsCard from "./NewsCard";
import useNews from "../../../hooks/useNews";

const NewsGrid = ({ baseCurrency, selectedCurrency }) => {
  const { data } = useNews(baseCurrency, selectedCurrency);

  return (
    <Card
      key={`${baseCurrency}vs${selectedCurrency}`}
      alignItems="center"
      background="gray.200"
      borderRadius={20}
      margin={3}
    >
      <Box
        background="gray.400"
        padding={3}
        width="100%"
        textAlign="center"
        margin={0}
        overflow="hidden"
        borderTopRadius={20}
      >
        <Heading size="md" color="white">
          NEWS
        </Heading>
      </Box>

      <CardBody alignItems="center" width="100%" maxH="455px" overflowY="auto">
        <NewsCard />
      </CardBody>
    </Card>
  );
};

export default NewsGrid;
