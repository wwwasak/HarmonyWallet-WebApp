import {
  Badge,
  Box,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import useRates from "../../../hooks/useRates";
import DetailRatesChart from "./DetailRatesChart";
import { DATE_RANGES } from "../../../data/DATE_RANGES";
import RatesStatistics from "./RatesStatistics";

const Charts = ({ baseCurrency, selectedCurrency }) => {
  const { data: weeklyData } = useRates(baseCurrency, DATE_RANGES["weekly"]);
  const { data: monthlyData } = useRates(
    baseCurrency,
    DATE_RANGES["fortnightly"]
  );
  const { data: oneYearData } = useRates(baseCurrency, DATE_RANGES["monthly"]);
  const { data: twoYearData } = useRates(baseCurrency, DATE_RANGES["yearly"]);
  console.log(weeklyData);

  return (
    <Box alignItems="center">
      <Tabs variant="soft-rounded" colorScheme="green" isFitted="true">
        <TabList marginX={2}>
          <Tab>7 DAYS</Tab>
          <Tab>2 WEEKS</Tab>
          <Tab>1 MONTH</Tab>
          <Tab>1 YEAR</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <DetailRatesChart data={weeklyData} currency={selectedCurrency} />
            <RatesStatistics data={weeklyData} currency={selectedCurrency} />
          </TabPanel>
          <TabPanel>
            <DetailRatesChart data={monthlyData} currency={selectedCurrency} />
            <RatesStatistics data={monthlyData} currency={selectedCurrency} />
          </TabPanel>
          <TabPanel>
            <DetailRatesChart data={oneYearData} currency={selectedCurrency} />
            <RatesStatistics data={oneYearData} currency={selectedCurrency} />
          </TabPanel>
          <TabPanel>
            <DetailRatesChart data={twoYearData} currency={selectedCurrency} />
            <RatesStatistics data={twoYearData} currency={selectedCurrency} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Charts;
