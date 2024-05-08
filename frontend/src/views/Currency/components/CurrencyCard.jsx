import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useCurrency } from "../../../stores/BaseCurrencyContext";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import LocalTime from "./LocalTime";
import RatesChart from "./RatesChart";
import React from "react";
import star from "../../../assets/star.png";
import starFavorite from "../../../assets/starFavorite.png";

const CurrencyCard = ({ currency, rate }) => {
  const { baseCurrency } = useCurrency();
  const [isFavorite, setIsFavorite] = useLocalStorage(currency, false);

  return (
    <Card
      key={currency}
      paddingTop={3}
      overflow="hidden"
      variant="outline"
      borderRadius={10}
    >
      <CardHeader
        display="flex"
        justifyContent="flex-end"
        padding={0}
        paddingRight={3}
      >
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
      </CardHeader>
      <CardBody alignItems="center" padding={0}>
        <Link to={`/ratesDetail/${baseCurrency}/${currency}`}>
          <RatesChart currency={currency} />
          <Flex flexDirection="column" alignItems="center" margin={2}>
            <Button fontSize="lg">{rate}</Button>
            <HStack>
              <Image
                src={`${currency}.png`}
                marginRight="8px"
                width="30px"
                height="auto"
                margin={1}
              />
              <Text fontSize="lg" fontWeight="bold">
                {currency}
              </Text>
            </HStack>
            <LocalTime currency={currency} />
          </Flex>
        </Link>
      </CardBody>
    </Card>
  );
};

export default CurrencyCard;
