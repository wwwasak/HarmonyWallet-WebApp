import React from "react";
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NewsCard = ({ data }) => {
  if (!data || !data.data || data.data.length === 0) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100%"
      >
        <Text>No recent related news</Text>
      </Box>
    );
  }

  return (
    <>
      {data.data.map((news, index) => (
        <Box
          key={index}
          mb={4}
          _hover={{
            transform: "scale(1.03)",
            transition: "transform .15s ease-in",
          }}
        >
          <Card
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
            height="180px"
          >
            <Image
              objectFit="cover"
              maxW={{ base: "100%", sm: "200px" }}
              src={news.image_url}
              alt="Currency Image"
              height="100%"
            />

            <CardBody>
              <Heading size="xs">
                <Link to={news.news_url}> {news.title} </Link>
              </Heading>
              <Text py="1">{news.text}</Text>
              <Text fontSize="xs" fontStyle="italic">
                {news.date}
              </Text>
            </CardBody>
          </Card>
        </Box>
      ))}
    </>
  );
};

export default NewsCard;
