import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import LeftIncomeChart from "./LeftIncomeChart";
import RightChart from "./RightIncomeChart";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useIncome from "../../../hooks/useIncome";
import { DATE_RANGES } from "../../../data/DATE_RANGES";
import axios from "axios";

export default function IncomeChartTabs({
  currency,
  weeklyIncomes,
  fortnightlyIncomes,
  monthlyIncomes,
  yearlyIncomes,
}) {
  //const { datePeriod, currency } = useParams();
  const [username, setUsername] = useState("");
  //console.log(monthlyIncomes);
  return (
    <>
      <Tabs variant="soft-rounded" colorScheme="green">
        <TabList padding="20px" justifyContent="space-around">
          {/* <Link to={`/income-detail/7/${currency}`}> */}
          <Tab
            _selected={{
              bg: "green.500",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Recent 7 days
          </Tab>
          {/* </Link> */}
          {/* <Link to={`/income-detail/14/${currency}`}> */}
          <Tab
            _selected={{
              bg: "green.500",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Recent 14 days
          </Tab>
          {/* </Link> */}
          {/* <Link to={`/income-detail/30/${currency}`}> */}
          <Tab
            _selected={{
              bg: "green.500",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Recent 30 days
          </Tab>
          {/* </Link> */}
          {/* <Link to={`/income-detail/365/${currency}`}> */}
          <Tab
            _selected={{
              bg: "green.500",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Recent 1 year
          </Tab>
          {/* </Link> */}
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
            <LeftIncomeChart datePeriod={weeklyIncomes} currency={currency} />
            <RightChart />
          </TabPanel>
          <TabPanel
            display="flex"
            flexDirection="row"
            justifyContent="space-around"
            alignItems="center"
            height="100%"
          >
            <LeftIncomeChart
              datePeriod={fortnightlyIncomes}
              currency={currency}
            />
            <RightChart />
          </TabPanel>
          <TabPanel
            display="flex"
            flexDirection="row"
            justifyContent="space-around"
            alignItems="center"
            height="100%"
          >
            <LeftIncomeChart datePeriod={monthlyIncomes} currency={currency} />
            <RightChart />
          </TabPanel>
          <TabPanel
            display="flex"
            flexDirection="row"
            justifyContent="space-around"
            alignItems="center"
            height="100%"
          >
            <LeftIncomeChart datePeriod={yearlyIncomes} currency={currency} />
            <RightChart />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
