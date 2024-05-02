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
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { useNavigate } from "react-router-dom";
import SignupCurrenciesSelector from "../../SignUp/components/SignupCurrenciesSelector";
import { expenseData } from "../../../data/ExpenseData.js";

const ExpenseLineChartCard = () => {
  const [selectedCurrency, setSelectedCurrency] = useState("");

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
  };

  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate("/expense");
  };

  const filteredData = selectedCurrency
    ? expenseData.filter((item) => item.currency === selectedCurrency)
    : expenseData;

    // const getOption = () => ({
    //   title: {
    //     text: 'Expense Records',
    //     left: 'center'
    //   },
    //   tooltip: {
    //     trigger: 'axis'
    //   },
    //   xAxis: {
    //     type: 'category',
    //     data: filteredData.map(item => item.Date)
    //   },
    //   yAxis: {
    //     type: 'value'
    //   },
    //   series: [{
    //     data: filteredData.map(item => item.amount),
    //     type: 'line',
    //     smooth: true,  // This makes the line smooth
    //     areaStyle: {}  // Optional: for area style chart
    //   }]
    // });
    const getOption = () => ({
      title: {
        text: 'Expense Records in Recent One Week',
        left: 'center',
        textStyle: {
          color: '#333',
          fontWeight: 'bold',
          fontSize: 16
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: filteredData.map(item => item.Date),
        axisTick: {
          alignWithLabel: true
        },
        axisLine: {
          lineStyle: {
            color: '#57606f'
          }
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value} $'
        },
        axisLine: {
          lineStyle: {
            color: '#57606f'
          }
        },
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: '#ced6e0'
          }
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      series: [{
        name: 'Expense',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        showSymbol: false,
        lineStyle: {
          width: 3,
          shadowColor: 'rgba(0,0,0,0.1)',
          shadowBlur: 10,
          shadowOffsetY: 10
        },
        itemStyle: {
          color: '#10ac84',
          borderColor: '#10ac84',
          borderWidth: 2
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(16, 172, 132, 0.4)'
          }, {
            offset: 1,
            color: 'rgba(16, 172, 132, 0.1)'
          }])
        },
        data: filteredData.map(item => item.amount)
      }]
    });
    
  return (
    // <Card>
    //   <CardHeader>
    //     <Flex justifyContent="space-between" alignItems="center" w="100%">
    //       <Flex flexGrow={1} justifyContent="center">
    //         <Heading size="sm" textTransform="uppercase">
    //           Expense Records
    //         </Heading>
    //       </Flex>
    //       <SignupCurrenciesSelector
    //         handleChange={handleCurrencyChange}
    //         setIsSelected={() => {}}
    //       />
    //     </Flex>
    //     <Divider my={2} />
    //   </CardHeader>
    //   <CardBody>
    //     <Box
    //       p={4}
    //       boxShadow="base"
    //       rounded="md"
    //       bg="white"
    //       width="100%"
    //       onClick={handleCardClick}
    //       cursor="pointer"
    //     >
    //       <ResponsiveContainer width="100%" height={300}>
    //         <LineChart data={filteredData}>
    //           <XAxis dataKey="Date" />
    //           <YAxis />
    //           <CartesianGrid strokeDasharray="3 3" />
    //           <Tooltip />
    //           <Legend />
    //           <Line type="monotone" dataKey="amount" stroke="#8884d8" />
    //         </LineChart>
    //       </ResponsiveContainer>
    //     </Box>
    //   </CardBody>
    // </Card>
    <Card onClick={handleCardClick} cursor="pointer">
      <CardHeader>
        <Flex justifyContent="space-between" alignItems="center" w="100%">
          <Heading size="sm" textTransform="uppercase">Expense Records</Heading>
          <SignupCurrenciesSelector handleChange={handleCurrencyChange} setIsSelected={() => {}} />
        </Flex>
        <Divider my={2} />
      </CardHeader>
      <CardBody>
        <Box p={4} boxShadow="base" rounded="md" bg="white" width="100%">
          <ReactECharts option={getOption()} style={{ height: '300px' }} />
        </Box>
      </CardBody>
    </Card>
  );
};

export default ExpenseLineChartCard;
