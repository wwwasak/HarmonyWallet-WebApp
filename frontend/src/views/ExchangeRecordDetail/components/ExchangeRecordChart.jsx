import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

export default function ExchangeRecordChart() {
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
          bg="green.200"
          padding="20px"
          minHeight="500px"
          borderRadius="16px"
        >
          <TabPanel>
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>One Month</p>
          </TabPanel>
          <TabPanel>
            <p>So Far</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
