import { Box, Grid, GridItem, useColorModeValue } from "@chakra-ui/react";

import ProfileCard from "./components/ProfileCard";
import IncomeLineChartCard from "./components/IncomeLineChartCard";
import ExpenseLineChartCard from "./components/ExpenseLineChartCard";
import RecentRecordsCard from "./components/RecentRecordsCard";
import FloatWindow from "./components/FloatWindow";

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
        <GridItem colSpan={9} >
          <IncomeLineChartCard w="100%" h="100%">
            {/* <Text>Line Chart Data</Text> */}
          </IncomeLineChartCard>
        </GridItem>
        <GridItem colSpan={9}>
          <ExpenseLineChartCard w="100%" h="100%">
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
