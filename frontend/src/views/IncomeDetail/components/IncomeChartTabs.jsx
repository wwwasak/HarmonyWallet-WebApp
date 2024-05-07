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
        >
          <TabPanel
            display="flex"
            flexDirection="row"
            justifyContent="space-around"
            alignItems="center"
            height="100%"
          >
            {weeklyIncomes.length > 0 ? (
              <>
                <LeftIncomeChart datePeriod={weeklyIncomes} />
                <RightChart chartData={weeklyIncomes} />
              </>
            ) : (
              <p>No records in recent 7 days.</p>
            )}
          </TabPanel>
          <TabPanel
            display="flex"
            flexDirection="row"
            justifyContent="space-around"
            alignItems="center"
            height="100%"
          >
            {fortnightlyIncomes.length > 0 ? (
              <>
                <LeftIncomeChart datePeriod={fortnightlyIncomes} />
                <RightChart chartData={fortnightlyIncomes} />
              </>
            ) : (
              <p>No records in recent 14 days</p>
            )}
          </TabPanel>
          <TabPanel
            display="flex"
            flexDirection="row"
            justifyContent="space-around"
            alignItems="center"
            height="100%"
          >
            {monthlyIncomes.length > 0 ? (
              <>
                <LeftIncomeChart datePeriod={monthlyIncomes} />
                <RightChart chartData={monthlyIncomes} />
              </>
            ) : (
              <p>No records in recent 30 days</p>
            )}
          </TabPanel>
          <TabPanel
            display="flex"
            flexDirection="row"
            justifyContent="space-around"
            alignItems="center"
            height="100%"
          >
            {yearlyIncomes.length > 0 ? (
              <>
                <LeftIncomeChart datePeriod={yearlyIncomes} />
                <RightChart chartData={yearlyIncomes} />
              </>
            ) : (
              <p>No records in recent 1 year</p>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
