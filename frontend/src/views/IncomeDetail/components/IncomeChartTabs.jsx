import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import LeftChart from "./LeftIncomeChart";
import RightChart from "./RightIncomeChart";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import useIncome from "../../../hooks/useIncome";
import { DATE_RANGES } from "../../../data/DATE_RANGES";

export default function IncomeChartTabs({ currency }) {
  //console.log(currency);
  //const { datePeriod, currency } = useParams();
  const { data: weeklyData } = useIncome(currency, DATE_RANGES["weekly"]);
  const { data: fortnightlyData } = useIncome(
    currency,
    DATE_RANGES["fortnightly"]
  );
  const { data: monthlyData } = useIncome(currency, DATE_RANGES["monthly"]);
  const { data: oneYearData } = useIncome(currency, DATE_RANGES["yearly"]);
  return (
    <>
      <Tabs variant="soft-rounded" colorScheme="green">
        <TabList padding="20px" justifyContent="space-around">
          <Link to={`/income-detail/7/${currency}`}>
            <Tab
              _selected={{
                bg: "green.500",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Recent 7 days
            </Tab>
          </Link>
          <Link to={`/income-detail/14/${currency}`}>
            <Tab
              _selected={{
                bg: "green.500",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Recent 14 days
            </Tab>
          </Link>
          <Link to={`/income-detail/30/${currency}`}>
            <Tab
              _selected={{
                bg: "green.500",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Recent 30 days
            </Tab>
          </Link>
          <Link to={`/income-detail/365/${currency}`}>
            <Tab
              _selected={{
                bg: "green.500",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Recent 1 year
            </Tab>
          </Link>
        </TabList>
        <TabPanels
          bg="green.100"
          padding="20px"
          minHeight="500px"
          borderRadius="16px"
        >
          <TabPanel
            display="flex"
            flexDirection="row"
            justifyContent="space-around"
            alignItems="center"
            height="100%"
          >
            <LeftChart datePeriod={weeklyData} currency={currency} />
            <RightChart />
          </TabPanel>
          <TabPanel
            display="flex"
            flexDirection="row"
            justifyContent="space-around"
            alignItems="center"
            height="100%"
          >
            <LeftChart datePeriod={fortnightlyData} currency={currency} />
            <RightChart />
          </TabPanel>
          <TabPanel
            display="flex"
            flexDirection="row"
            justifyContent="space-around"
            alignItems="center"
            height="100%"
          >
            <LeftChart datePeriod={monthlyData} currency={currency} />
            <RightChart />
          </TabPanel>
          <TabPanel
            display="flex"
            flexDirection="row"
            justifyContent="space-around"
            alignItems="center"
            height="100%"
          >
            <LeftChart datePeriod={oneYearData} currency={currency} />
            <RightChart />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
