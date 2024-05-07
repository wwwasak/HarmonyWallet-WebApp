import { useState } from "react";
import Amount from "./Amount";
import CurrencySelector from "./CurrencySelector";
import React from "react";
import {
  Grid,
  GridItem,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  HStack,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import useConversionRates from "../../../hooks/useConversionRates";

const Calculator = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [input, setInput] = useState("");
  const {
    data: conversionData,
    error,
    isLoading,
  } = useConversionRates(input, fromCurrency, toCurrency);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <>
      <HStack width={300}>
        <Image
          src="./pictures/calculator.png"
          boxSize="60px"
          objectFit="cover"
          cursor="pointer"
          onClick={onOpen}
        />

        <Text color="grey" fontWeight="700">
          Calculator
        </Text>
      </HStack>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Conversion Calculator</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid
              templateAreas={["'amount from to'", "'amount from to'"]}
              templateColumns={"2fr 1fr 1fr"}
              gap={3}
            >
              <GridItem area="amount">
                <Text>Amount</Text>
                <Amount input={input} onInputChange={handleInputChange} />
              </GridItem>
              <GridItem area="from">
                <Text>From</Text>
                <CurrencySelector
                  baseCurrency={fromCurrency}
                  setBaseCurrency={(currency) => setFromCurrency(currency)}
                />
              </GridItem>
              <GridItem area="to">
                <Text>To</Text>
                <CurrencySelector
                  baseCurrency={toCurrency}
                  setBaseCurrency={(currency) => setToCurrency(currency)}
                />
              </GridItem>
            </Grid>
            {isLoading && <Spinner />}
            {fromCurrency !== toCurrency &&
              conversionData.rates &&
              conversionData.rates[toCurrency] && (
                <>
                  <Text mt={4}>
                    {input} {fromCurrency} =
                  </Text>
                  <Text mt={4} fontSize={25}>
                    {conversionData.rates[toCurrency]} {toCurrency}
                  </Text>
                </>
              )}
            {fromCurrency === toCurrency && fromCurrency && toCurrency && (
              <>
                <Text mt={4}>
                  {input} {fromCurrency} =
                </Text>
                <Text mt={4} fontSize={25}>
                  {input} {toCurrency}
                </Text>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Calculator;
