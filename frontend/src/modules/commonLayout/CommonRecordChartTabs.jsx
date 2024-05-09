import {
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Box,
  } from "@chakra-ui/react";
  import LeftChart from "./LeftChart";
  import RightChart from "./RightChart";
  import { useNavigation } from "../../stores/RouterNavigationContext";
  
  export default function CommonChartTabs({
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
                  <LeftChart datePeriod={weeklyIncomes} />
                  <RightChart chartData={weeklyIncomes} />
                </>
              ) : (
                <p style={{ color: "rgba(128, 128, 128, 0.75)", fontStyle: "italic", textAlign: "center" }}>No records in recent 7 days.<br />
                Click on the 'Back' button and then find the '+' icon at the bottom right of the page to start recording!</p>
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
                  <LeftChart datePeriod={fortnightlyIncomes} />
                  <RightChart chartData={fortnightlyIncomes} />
                </>
              ) : (
                <p style={{ color: "rgba(128, 128, 128, 0.75)", fontStyle: "italic", textAlign: "center" }}>No records in recent 14 days.<br />
                Click on the 'Back' button and then find the '+' icon at the bottom right of the page to start recording!</p>
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
                  <LeftChart datePeriod={monthlyIncomes} />
                  <RightChart chartData={monthlyIncomes} />
                </>
              ) : (
                <p style={{ color: "rgba(128, 128, 128, 0.75)", fontStyle: "italic", textAlign: "center" }}>No records in recent 30 days.<br />
                Click on the 'Back' button and then find the '+' icon at the bottom right of the page to start recording!</p>
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
                  <LeftChart datePeriod={yearlyIncomes} />
                  <RightChart chartData={yearlyIncomes} />
                </>
              ) : (
                <p style={{ color: "rgba(128, 128, 128, 0.75)", fontStyle: "italic", textAlign: "center" }}>No records in recent 1 year.<br />
                Click on the 'Back' button and then find the '+' icon at the bottom right of the page to start recording!</p>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    );
  }
  