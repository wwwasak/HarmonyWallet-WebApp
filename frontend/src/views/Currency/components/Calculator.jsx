import { useState } from "react";
import Amount from "./Amount";
import budget from "../../../assets/budget.png";
import CurrencySelector from "./CurrencySelector";
import React from "react";
import {
  Button,
  Grid,
  GridItem,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

const Calculator = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [input, setInput] = useState("");
  const [isConvertClicked, setIsConvertClicked] = useState(false);

  const handleInputChange = (e) => setInput(e.target.value);

  const handleConvert = () => {
    setIsConvertClicked(true);
  };

  return (
    <>
      <Image
        src={budget}
        boxSize="60px"
        objectFit="cover"
        cursor="pointer"
        onClick={onOpen}
      />

      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setIsConvertClicked(false);
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
            {isConvertClicked && input && fromCurrency && toCurrency && (
              <>
                <Text mt={4}>
                  {input} {fromCurrency} =
                </Text>
                <Text mt={4} fontSize={25}>
                  converted amount {toCurrency}
                </Text>
              </>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleConvert}
              isDisabled={!input || !fromCurrency || !toCurrency}
            >
              Convert
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Calculator;
