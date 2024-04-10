import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import LineChart from "./LineChart";
import PieChart from "./PieChart";

export default function LineAndPieChartTabs() {
  return (
    <>
      <Tabs variant="soft-rounded" colorScheme="green">
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
            <LineChart />
            <PieChart />
          </TabPanel>
          <TabPanel
            display="flex"
            flexDirection="row"
            justifyContent="space-around"
            alignItems="center"
            height="100%"
          >
            <LineChart />
            <PieChart />
          </TabPanel>
          <TabPanel
            display="flex"
            flexDirection="row"
            justifyContent="space-around"
            alignItems="center"
            height="100%"
          >
            <LineChart />
            <PieChart />
          </TabPanel>
          <TabPanel
            display="flex"
            flexDirection="row"
            justifyContent="space-around"
            alignItems="center"
            height="100%"
          >
            <LineChart />
            <PieChart />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
