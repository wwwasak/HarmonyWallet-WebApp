import { Box, Text, Center } from "@chakra-ui/react";
import ExchangeRecordChart from "./components/ExchangeRecordChart";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

export default function ExchangeRecordDetail() {
  return (
    <>
      <Box p={5}>
        <Center>
          <Text fontSize="2xl" fontWeight="bold">
            Exchange Record
          </Text>
        </Center>

        <Tabs
          variant="soft-rounded"
          colorScheme="green"
          orientation="vertical"
          flex="1"
          display="flex"
          flexDirection="row"
        >
          <TabList
            minWidth="200px"
            m="var(--chakra-space-4)"
            justifyContent="center"
            alignItems="center"
          >
            <Tab
              _selected={{
                bg: "green.500",
                color: "white",
                fontWeight: "bold",
              }}
              mx={10}
              mt={3}
            >
              RMB - AUD
            </Tab>
            <Tab
              _selected={{
                bg: "green.500",
                color: "white",
                fontWeight: "bold",
              }}
              mx={10}
              mt={5}
            >
              RMB - AUD
            </Tab>
            <Tab
              _selected={{
                bg: "green.500",
                color: "white",
                fontWeight: "bold",
              }}
              mx={10}
              mt={5}
            >
              RMB - AUD
            </Tab>
            <Tab
              _selected={{
                bg: "green.500",
                color: "white",
                fontWeight: "bold",
              }}
              mx={10}
              mt={5}
            >
              RMB - AUD
            </Tab>
          </TabList>
          <TabPanels flex="1" ml={5}>
            <TabPanel>
              <ExchangeRecordChart />
            </TabPanel>
            <TabPanel>
              <ExchangeRecordChart />
            </TabPanel>
            <TabPanel>
              <ExchangeRecordChart />
            </TabPanel>
            <TabPanel>
              <ExchangeRecordChart />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}
