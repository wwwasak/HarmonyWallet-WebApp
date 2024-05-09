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
import RatesStatistics from "./RatesStatistics";
import { subDays, subMonths, subYears, format } from "date-fns";

const oneWeekAgo = format(subDays(new Date(), 6), "yyyy-MM-dd");

const twoWeeksAgo = format(subDays(new Date(), 13), "yyyy-MM-dd");

const oneMonthAgo = format(subMonths(new Date(), 1), "yyyy-MM-dd");

const oneYearAgo = format(subDays(new Date(), 363), "yyyy-MM-dd");

const Charts = ({ baseCurrency, selectedCurrency }) => {
  const { data: weeklyData } = useRates(baseCurrency, oneWeekAgo);
  const { data: monthlyData } = useRates(baseCurrency, twoWeeksAgo);
  const { data: oneYearData } = useRates(baseCurrency, oneMonthAgo);
  const { data: twoYearData } = useRates(baseCurrency, oneYearAgo);

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
