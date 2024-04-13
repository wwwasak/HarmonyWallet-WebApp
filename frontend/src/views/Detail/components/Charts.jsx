import {
  Badge,
  Box,
  HStack,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import chart from "../../../assets/chart.png";

const Charts = ({ baseCurrency, selectedCurrency }) => {
  return (
    <Box alignItems="center">
      <Tabs variant="soft-rounded" colorScheme="green" isFitted="true">
        <TabList marginX={2}>
          <Tab>24 HOURS</Tab>
          <Tab>7 DAYS</Tab>
          <Tab>1 MONTH</Tab>
          <Tab>1 YEAR</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Text>
              24 hours chart {baseCurrency} vs {selectedCurrency}
            </Text>
            <Image src={chart} />
          </TabPanel>
          <TabPanel>
            <Text>
              7 days chart {baseCurrency} vs {selectedCurrency}
            </Text>
            <Image src={chart} />
          </TabPanel>
          <TabPanel>
            <Text>
              1 month chart {baseCurrency} vs {selectedCurrency}
            </Text>
            <Image src={chart} />
          </TabPanel>
          <TabPanel>
            <Text>
              1 year chart {baseCurrency} vs {selectedCurrency}
            </Text>
            <Image src={chart} />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <HStack justifyContent="space-between" alignItems="center" margin={2}>
        <Badge fontSize="lg" colorScheme="red">
          LOWEST: 666.6
        </Badge>
        <Badge fontSize="lg" colorScheme="green">
          HIGHEST: 666.6
        </Badge>
        <Badge fontSize="lg">AVERAGE: 666.6</Badge>
      </HStack>
    </Box>
  );
};

export default Charts;
