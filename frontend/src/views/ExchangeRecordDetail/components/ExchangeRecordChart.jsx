import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
} from "@chakra-ui/react";
import LineChart from "../../IncomeDetail/components/LineChart";

export default function ExchangeRecordChart() {
  return (
    <>
      <Tabs variant="soft-rounded" colorScheme="green">
        <Flex>
          <TabList
            padding="20px"
            justifyContent="space-around"
            flexDirection="column"
          >
            <Tab
              _selected={{
                bg: "green.500",
                color: "white",
                fontWeight: "bold",
              }}
            >
              1111
            </Tab>
            <Tab
              _selected={{
                bg: "green.500",
                color: "white",
                fontWeight: "bold",
              }}
            >
              222
            </Tab>
          </TabList>
          <TabPanels
            bg="green.100"
            padding="20px"
            minHeight="500px"
            borderRadius="16px"
          >
            <TabPanel bg="red.200">
              <LineChart></LineChart>
            </TabPanel>
            <TabPanel>
              <LineChart></LineChart>
            </TabPanel>
          </TabPanels>
        </Flex>
      </Tabs>
    </>
  );
}
