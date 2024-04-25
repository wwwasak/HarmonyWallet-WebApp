import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import chart from "../../../assets/chart.png";
import React from "react";
import star from "../../../assets/star.png";
import starFavorite from "../../../assets/starFavorite.png";
import { useCurrency } from "../../../stores/BaseCurrencyContext";

const CurrencyCard = ({ currency, rate }) => {
  const { baseCurrency } = useCurrency();
  const [isFavorite, setIsFavorite] = useLocalStorage(currency, false);

  return (
    <Card
      key={currency}
      alignItems="center"
      paddingTop={3}
      border="1px solid gray"
    >
      <Box position="absolute" top={0} right={0} margin={2}>
        <Image
          src={isFavorite ? starFavorite : star}
          boxSize="30px"
          objectFit="cover"
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          cursor="pointer"
        />
      </Box>
      <Link to={`/ratesDetail/${baseCurrency}/${currency}`}>
        <Image src={chart} boxSize="150px" objectFit="cover" />
        <CardBody alignItems="center">
          <Flex flexDirection="column" alignItems="center">
            <Button fontSize="lg">{rate}</Button>
            <Text fontSize="lg" fontWeight="bold">
              {currency}
            </Text>
            <Text>Local Time</Text>
          </Flex>
        </CardBody>
      </Link>
    </Card>
  );
};

export default CurrencyCard;
