import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  Box,
} from "@chakra-ui/react";
import LeftIncomeChart from "./LeftIncomeChart";
import RightChart from "./RightIncomeChart";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useIncome from "../../../hooks/useIncome";
import axios from "axios";
import { useNavigation } from "../../../stores/RouterNavigationContext";

export default function IncomeChartTabs({
  weeklyIncomes,
  fortnightlyIncomes,
  monthlyIncomes,
  yearlyIncomes,
}) {
  const navigate = useNavigation();
  const handleButtonClick = () => {
    navigate("/");
  };

  return (
    <Box>
      <Tabs variant="soft-rounded" colorScheme="green">
        <TabList padding="20px" justifyContent="space-around">
          <Tab
            _selected={{
              bg: "green.500",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Recent 7 days
          </Tab>

          <Tab
            _selected={{
              bg: "green.500",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Recent 14 days
          </Tab>

          <Tab
            _selected={{
              bg: "green.500",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Recent 30 days
          </Tab>
          <Tab
            _selected={{
              bg: "green.500",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Recent 1 year
          </Tab>
        </TabList>
        <TabPanels
          bg="rgba(255, 255, 255, 0.5)"
          backdropFilter="blur(10px)"
          borderRadius={20}
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
            <LeftIncomeChart datePeriod={weeklyIncomes} />
            <RightChart chartData={weeklyIncomes} />
          </TabPanel>
          <TabPanel
            display="flex"
            flexDirection="row"
            justifyContent="space-around"
            alignItems="center"
            height="100%"
          >
            <LeftIncomeChart datePeriod={fortnightlyIncomes} />
            <RightChart chartData={fortnightlyIncomes} />
          </TabPanel>
          <TabPanel
            display="flex"
            flexDirection="row"
            justifyContent="space-around"
            alignItems="center"
            height="100%"
          >
            <LeftIncomeChart datePeriod={monthlyIncomes} />
            <RightChart chartData={monthlyIncomes} />
          </TabPanel>
          <TabPanel
            display="flex"
            flexDirection="row"
            justifyContent="space-around"
            alignItems="center"
            height="100%"
          >
            <LeftIncomeChart datePeriod={yearlyIncomes} />
            <RightChart chartData={yearlyIncomes} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
