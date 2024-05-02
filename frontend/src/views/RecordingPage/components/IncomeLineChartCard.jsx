import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Flex,
  Divider,
  Box,
} from "@chakra-ui/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";
import SignupCurrenciesSelector from "../../SignUp/components/SignupCurrenciesSelector";
import { incomeData } from "../../../data/IncomeData.js";

const IncomeLineChartCard = () => {
  const [selectedCurrency, setSelectedCurrency] = useState("");

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
  };

  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate("/income");
  };

  const filteredData = selectedCurrency
    ? incomeData.filter((item) => item.currency === selectedCurrency)
    : incomeData;

  return (
    <Card>
      <CardHeader>
        <Flex justifyContent="space-between" alignItems="center" w="100%">
          <Flex flexGrow={1} justifyContent="center">
            <Heading size="sm" textTransform="uppercase">
              Income Records
            </Heading>
          </Flex>
          <SignupCurrenciesSelector
            handleChange={handleCurrencyChange}
            setIsSelected={() => {}}
          />
        </Flex>
        <Divider my={2} />
      </CardHeader>
      <CardBody>
        <Box
          p={4}
          boxShadow="base"
          rounded="md"
          bg="white"
          width="100%"
          onClick={handleCardClick}
          cursor="pointer"
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredData}>
              <XAxis dataKey="Date" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="amount" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardBody>
    </Card>
  );
};

export default IncomeLineChartCard;
