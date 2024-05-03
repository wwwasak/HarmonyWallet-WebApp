import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
} from "@chakra-ui/react";
import LineChart from "../../IncomeDetail/components/LineChart";
import { format } from "date-fns";
import { useState, useEffect } from "react";

export default function ExchangeRecordChart({ chartData }) {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (chartData != null) {
      const groupedData = {};

      chartData.forEach((exchange) => {
        const key = `${exchange.fromCurrency} - ${exchange.toCurrency}`;
        const dateKey = format(exchange.date, "yyyy-MM-dd");

        if (!groupedData[key]) {
          groupedData[key] = {};
        }

        if (!groupedData[key][dateKey]) {
          groupedData[key][dateKey] = {
            totalToAmount: 0,
            totalFromAmount: 0,
            count: 0,
          };
        }

        groupedData[key][dateKey].totalToAmount += exchange.toAmount;
        groupedData[key][dateKey].totalFromAmount += exchange.fromAmount;
        groupedData[key][dateKey].count++;
      });

      const result = Object.entries(groupedData).map(
        ([currencyPair, dates]) => {
          const formattedDates = Object.entries(dates).map(([date, data]) => ({
            date,
            averageRate: (data.totalToAmount / data.totalFromAmount).toFixed(2),
          }));

          return {
            currencyPair,
            dates: formattedDates,
          };
        }
      );

      setFilteredData(result);
    }
  }, [chartData]);

  console.log(filteredData);
  return (
    <>
      <Tabs variant="soft-rounded" colorScheme="green">
        <Flex>
          <TabList
            padding="20px"
            justifyContent="center"
            flexDirection="column"
          >
            {filteredData.map((data, index) => (
              <Tab
                _selected={{
                  bg: "green.300",
                  color: "white",
                  fontWeight: "bold",
                }}
                key={index}
                minW={40}
              >
                {data.currencyPair}
              </Tab>
            ))}
          </TabList>
          <TabPanels padding="20px" minHeight="500px" borderRadius="16px">
            {filteredData.map((data, index) => (
              <TabPanel key={index}>
                <LineChart
                  xAxis={data.dates.map((dateInfo) => dateInfo.date)}
                  seriesData={data.dates.map((dateInfo) =>
                    parseFloat(dateInfo.averageRate)
                  )}
                />
              </TabPanel>
            ))}
          </TabPanels>
        </Flex>
      </Tabs>
    </>
  );
}
