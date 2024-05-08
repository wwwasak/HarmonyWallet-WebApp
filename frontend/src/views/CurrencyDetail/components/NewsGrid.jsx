import { Card, CardBody, Heading } from "@chakra-ui/react";
import React from "react";
import NewsCard from "./NewsCard";
import useNews from "../../../hooks/useNews";

const NewsGrid = ({ baseCurrency, selectedCurrency }) => {
  const { data, error } = useNews(baseCurrency, selectedCurrency);

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <Card
      key={`${baseCurrency}vs${selectedCurrency}`}
      alignItems="center"
      borderRadius={20}
      margin={3}
    >
      <Heading size="md" marginY={3}>
        Related News
      </Heading>

      <CardBody alignItems="center" width="100%" maxH="455px" overflowY="auto">
        <NewsCard data={data} />
      </CardBody>
    </Card>
  );
};

export default NewsGrid;
