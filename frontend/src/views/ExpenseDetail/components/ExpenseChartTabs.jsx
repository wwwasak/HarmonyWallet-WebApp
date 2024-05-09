import { Tabs, Tab, TabList, TabPanels, TabPanel } from "@chakra-ui/react";
import LeftExpenseChart from "./LeftExpenseChart";
import RightExpenseChart from "./RightExpenseChart";

export default function ExpenseChartTabs() {
  return (
    <>
      <Tabs isLazy variant="soft-rounded" colorScheme="green">
        <TabList padding="20px" justifyContent="space-around">
          <Tab
            _selected={{ bg: "green.500", color: "white", fontWeight: "bold" }}
          >
            One Week
          </Tab>
          <Tab
            _selected={{ bg: "green.500", color: "white", fontWeight: "bold" }}
          >
            Two Weeks
          </Tab>
          <Tab
            _selected={{ bg: "green.500", color: "white", fontWeight: "bold" }}
          >
            One Month
          </Tab>
          <Tab
            _selected={{ bg: "green.500", color: "white", fontWeight: "bold" }}
          >
            So Far
          </Tab>
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
            <LeftExpenseChart />
            <RightExpenseChart />
          </TabPanel>
          <TabPanel
            display="flex"
            flexDirection="row"
            justifyContent="space-around"
            alignItems="center"
            height="100%"
          >
            <LeftExpenseChart />
            <RightExpenseChart />
          </TabPanel>
          <TabPanel
            display="flex"
            flexDirection="row"
            justifyContent="space-around"
            alignItems="center"
            height="100%"
          >
            <LeftExpenseChart />
            <RightExpenseChart />
          </TabPanel>
          <TabPanel
            display="flex"
            flexDirection="row"
            justifyContent="space-around"
            alignItems="center"
            height="100%"
          >
            <LeftExpenseChart />
            <RightExpenseChart />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
