import { useState } from "react";
import axios from "axios";
import CurrencySelector from "./BaseCurrencySelector";
import {
  Box,
  Button,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Select,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useNavigation } from "../../../stores/RouterNavigationContext";

export default function FloatWindow() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tableType, setTableType] = useState("incomeExpense");
  const [date, setDate] = useState(new Date());
  const [incomeType, setIncomeType] = useState("Income");
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState("RMB");

  const [fromAmount, setFromAmount] = useState("");
  const [fromUnit, setFromUnit] = useState("USD");
  const [toAmount, setToAmount] = useState("");
  const [toUnit, setToUnit] = useState("EUR");

  const navigate = useNavigation();

  const handleIncomeExpenseClick = () => {
    setTableType("incomeExpense");
  };

  const handleExchangeRecordClick = () => {
    setTableType("exchangeRecord");
  };

  const handleSaveClick = async () => {
    const url = "http://localhost:3000/api/add-record";
    const authToken = localStorage.getItem("authToken");

    if (tableType === "incomeExpense") {
      if (!date || !incomeType || !amount || !unit) {
        alert("Please fill in all fields.");
        return;
      }
    } else if (tableType === "exchangeRecord") {
      if (!date || !fromAmount || !fromUnit || !toAmount || !toUnit) {
        alert("Please fill in all fields.");
        return;
      }
    }
    
    const data =
      tableType === "incomeExpense"
        ? {
          date,
          type: incomeType,
          amount,
          unit,
        }
        : {
          date,
          type: "Exchange",
          fromAmount,
          fromUnit,
          toAmount,
          toUnit,
        };

    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    try {
      const response = await axios.post(url, data, config);
      console.log("Server response:", response.data);
      navigate("/");
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <>
      <Box position="fixed" bottom="4" right="4" zIndex="999">
        <Button
          onClick={onOpen}
          borderRadius="full"
          bg="blue.500"
          color="white"
          size="lg"
          boxShadow="lg"
          _hover={{ bg: "blue.600" }}
        >
          +
        </Button>
      </Box>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="200px"
        scrollBehavior="inside"
      >
        <ModalOverlay />

        <ModalContent w="950px">
          <ModalHeader>Add Record</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex justify="center" mb={4}>
              <Button
                mr={4}
                onClick={handleIncomeExpenseClick}
                bg={tableType === "incomeExpense" ? "blue.500" : "gray.300"}
                color={tableType === "incomeExpense" ? "white" : "gray.600"}
              >
                Income/Expense
              </Button>
              <Button
                onClick={handleExchangeRecordClick}
                bg={tableType === "exchangeRecord" ? "blue.500" : "gray.300"}
                color={tableType === "exchangeRecord" ? "white" : "gray.600"}
              >
                Exchange Record
              </Button>
            </Flex>
            {tableType === "incomeExpense" && (
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th w="150px">Date</Th>
                    <Th w="150px">Income/EXPENSE</Th>
                    <Th w="150px">Amount</Th>
                    <Th w="150px">Unit</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>
                      <DatePicker
                        dateFormat="MMMM d, yyyy"
                        selected={date}
                        onChange={setDate}
                        customInput={<input />}
                        maxDate={new Date()}
                      />
                    </Td>
                    <Td>
                      <Select
                        size="md"
                        value={incomeType}
                        onChange={(e) => setIncomeType(e.target.value)}
                      >
                        <option value="Income">Income</option>
                        <option value="Expense">Expense</option>
                      </Select>
                    </Td>
                    <Td>
                      <Input
                        size="md"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </Td>
                    <Td>
                      <CurrencySelector selected={unit} onSelect={setUnit} />
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            )}
            {tableType === "exchangeRecord" && (
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Date</Th>
                    <Th>From Amount</Th>
                    <Th>From Unit</Th>
                    <Th>To Amount</Th>
                    <Th>To Unit</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>
                      <DatePicker
                        dateFormat="MMMM d, yyyy"
                        selected={date}
                        onChange={setDate}
                        customInput={<input />}
                        maxDate={new Date()}
                      />
                    </Td>
                    <Td>
                      <Input
                        size="md"
                        value={fromAmount}
                        onChange={(e) => setFromAmount(e.target.value)}
                      />
                    </Td>
                    <Td>
                      <CurrencySelector
                        selected={fromUnit}
                        onSelect={setFromUnit}
                      />
                    </Td>
                    <Td>
                      <Input
                        size="md"
                        value={toAmount}
                        onChange={(e) => setToAmount(e.target.value)}
                      />
                    </Td>
                    <Td>
                      <CurrencySelector
                        selected={toUnit}
                        onSelect={setToUnit}
                      />
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                handleSaveClick();
                onClose();
                window.location.reload();
              }}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
