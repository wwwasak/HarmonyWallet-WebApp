import { Box, Grid, GridItem, useColorModeValue } from "@chakra-ui/react";

import ProfileCard from "./components/ProfileCard";
import IncomeLineChartCard from "./components/IncomeLineChartCard";
import ExpenseLineChartCard from "./components/ExpenseLineChartCard";
import RecentRecordsCard from "./components/RecentRecordsCard";
import FloatWindow from "./components/FloatWindow";

const data = [
  { Date: "17/04/2024", currency: 2400, amt: 2400 },
  { Date: "16/04/2024", currency: 1398, amt: 2210 },
  { Date: "15/04/2024", currency: 9800, amt: 2290 },
  { Date: "14/04/2024", currency: 3908, amt: 2000 },
  { Date: "13/04/2024", currency: 4800, amt: 2181 },
  { Date: "12/04/2024", currency: 3800, amt: 2500 },
  { Date: "11/04/2024", currency: 4300, amt: 2100 },
];

const RecordingPage = () => {
  const baseCurrency = "NZD";
  const username = "Joker";
  const bgColor = useColorModeValue("gray.100", "gray.700");

  return (
    <Box bg={bgColor} p={5}>
      <Grid
        templateColumns="repeat(12, 1fr)" // Creates three columns
        gap={4} // Sets gap between grid items
        p={8} // Padding around the grid
      >
        <GridItem colSpan={3} ml={45} mr={79}>
          <ProfileCard
            w="100%"
            h="100%"
            username={username}
            baseCurrency={baseCurrency}
          />
        </GridItem>
        <GridItem colSpan={9}>
          <IncomeLineChartCard w="100%" h="100%" data={data}>
            {/* <Text>Line Chart Data</Text> */}
          </IncomeLineChartCard>
        </GridItem>
        <GridItem colSpan={9}>
          <ExpenseLineChartCard w="100%" h="100%" data={data}>
            {/* <Text>More Data Here</Text> */}
          </ExpenseLineChartCard>
        </GridItem>
        <GridItem colSpan={3}>
          <RecentRecordsCard w="100%" h="100%">
            {/* <Text>Additional Info</Text> */}
          </RecentRecordsCard>
        </GridItem>
      </Grid>
      <FloatWindow />
    </Box>
  );
};

export default RecordingPage;
