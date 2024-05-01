import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import useIncome from "../../../hooks/useIncome";
import { DATE_RANGES } from "../../../data/DATE_RANGES";

export default function LineAndPieChartTabs({ currency }) {
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
            <LineChart datePeriod={weeklyData} currency={currency} />
            <PieChart />
          </TabPanel>
          <TabPanel
            display="flex"
            flexDirection="row"
            justifyContent="space-around"
            alignItems="center"
            height="100%"
          >
            <LineChart datePeriod={fortnightlyData} currency={currency} />
            <PieChart />
          </TabPanel>
          <TabPanel
            display="flex"
            flexDirection="row"
            justifyContent="space-around"
            alignItems="center"
            height="100%"
          >
            <LineChart datePeriod={monthlyData} currency={currency} />
            <PieChart />
          </TabPanel>
          <TabPanel
            display="flex"
            flexDirection="row"
            justifyContent="space-around"
            alignItems="center"
            height="100%"
          >
            <LineChart datePeriod={oneYearData} currency={currency} />
            <PieChart />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
