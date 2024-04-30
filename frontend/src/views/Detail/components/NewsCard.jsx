import React from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const data = {
  data: [
    {
      news_url:
        "https://www.fxempire.com/forecasts/article/gold-price-forecast-faces-resistance-risk-of-deeper-pullback-looms-1426574",
      image_url: "https://forexnewsapi.snapi.dev/images/v1/f/o/f39-187685.jpg",
      title:
        "Gold Price Forecast: Faces Resistance, Risk of Deeper Pullback Looms",
      text: "Gold faces resistance at the 8-Day MA, signaling potential for a deeper pullback and bearish behavior.",
      source_name: "FXEmpire",
      date: "Fri, 26 Apr 2024 16:32:36 -0400",
      topics: ["Gold"],
      sentiment: "Negative",
      type: "Article",
      currency: ["XAU-USD"],
    },
    {
      news_url:
        "https://www.fxempire.com/forecasts/article/gold-silver-platinum-forecasts-gold-gains-ground-ahead-of-the-weekend-1426506",
      image_url: "https://forexnewsapi.snapi.dev/images/v1/f/v/f31-187681.jpg",
      title:
        "Gold, Silver, Platinum Forecasts – Gold Gains Ground Ahead Of The Weekend",
      text: "Demand for gold stays strong despite stronger dollar.",
      source_name: "FXEmpire",
      date: "Fri, 26 Apr 2024 13:21:21 -0400",
      topics: ["Gold", "Silver", "Platinum"],
      sentiment: "Positive",
      type: "Article",
      currency: ["XAG-USD", "XAU-USD", "XPT-USD"],
    },
  ],
};

const NewsCard = () => {
  return data.data.map((news) => {
    return (
      <Box mb={4}>
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
          height="180px"
        >
          <Image
            objectFit="cover"
            maxW={{ base: "100%", sm: "100px" }}
            src={news.image_url}
            alt="Currency Image"
            height="100%"
          />

          <CardBody>
            <Heading size="xs">
              {" "}
              <Link to={news.news_url}> {news.title} </Link>
            </Heading>
            <Text py="1">{news.text}</Text>
            <Text fontSize="xs" fontStyle="italic">
              {news.date}
            </Text>
          </CardBody>
        </Card>
      </Box>
    );
  });
  //   <Card
  //     height="100px"
  //     direction={{ base: "column", sm: "row" }}
  //     overflow="hidden"
  //     variant="outline"
  //   >
  //     <Image
  //       objectFit="cover"
  //       maxW={{ base: "100%", sm: "200px" }}
  //       src={data[0].image_url}
  //       alt="Currency Image"
  //     />

  //     <Stack>
  //       <CardBody>
  //         <Heading size="md">{data[0].title}</Heading>
  //         <Text py="2">{data[0].text}</Text>
  //         <Text fontSize="xs" fontStyle="italic">
  //           {" "}
  //           {data[0].date}
  //         </Text>
  //       </CardBody>

  //       <CardFooter>
  //         <Button variant="solid" colorScheme="blue">
  //           View Detail
  //         </Button>
  //       </CardFooter>
  //     </Stack>
  //   </Card>
  // );
};

export default NewsCard;
