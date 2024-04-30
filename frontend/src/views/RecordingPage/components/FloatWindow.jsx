import React, { useState } from "react";
import axios from "axios";
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

export default function FloatWindow() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tableType, setTableType] = useState("incomeExpense");

  const handleIncomeExpenseClick = () => {
    setTableType("incomeExpense");
  };

  const handleExchangeRecordClick = () => {
    setTableType("exchangeRecord");
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
          <ModalHeader>Editor</ModalHeader>
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
                    <Th w="150px">Income/FEE</Th>
                    <Th w="150px">Amount</Th>
                    <Th w="150px">Unit</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>
                      <Input size="md" defaultValue="2024-04-17" />
                    </Td>
                    <Td>
                      <Select size="md" defaultValue="Income">
                        <option value="Income">Income</option>
                        <option value="Fee">Fee</option>
                      </Select>
                    </Td>
                    <Td>
                      <Input size="md" defaultValue="100" />
                    </Td>
                    <Td>
                      <Input size="md" defaultValue="RMB" />
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
                      <Input size="md" defaultValue="2024-04-17" />
                    </Td>
                    <Td>
                      <Input size="md" defaultValue="100" />
                    </Td>
                    <Td>
                      <Input size="md" defaultValue="RMB" />
                    </Td>
                    <Td>
                      <Input size="md" defaultValue="80" />
                    </Td>
                    <Td>
                      <Input size="md" defaultValue="USD" />
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
