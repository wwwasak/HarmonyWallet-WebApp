import { Card, CardHeader, CardBody, Grid, Text, Heading, 
    Button, Flex, Divider, Avatar, Box, IconButton} from "@chakra-ui/react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const GoToBillingPageButton = () => {
  return (
    <Link to="/billing">
      <IconButton
        icon={<FaPlus style={{ fontSize: "50px" }}/>}
        boxSize={{ base: "32px", md: "50px", lg: "70px" }}
        isRound={true}
        colorScheme="blue"
        position="fixed"
        bottom="16px"
        right="16px"
        aria-label="Go to billing page"// Accessibility design
      />
    </Link>
  );
};

const ProfileCard = ({ gridArea }) => {
    return(
        <Card gridArea={gridArea}>
            <CardHeader>
                <Flex justify="space-between" align="center">
                    <Heading size='sm' textTransform='uppercase'>Profile</Heading>
                    <Button variant='solid' colorScheme='blue' fontSize="xs" size="xs">
                        Edit
                    </Button>
                </Flex>
                <Divider my={2} />
                <div>
                <Avatar 
                src='./src/assets/DefaultAvatar.svg' 
                onError={(e) => { e.target.onerror = null; e.target.src='https://bit.ly/sage-adebayo'; }} 
                />
                </div>
            </CardHeader>
            <CardBody>
            
            </CardBody>
        </Card>
    );
};

const data = [
    {Date: '17/04/2024', currency: 2400, amt: 2400},
    {Date: '16/04/2024', currency: 1398, amt: 2210},
    {Date: '15/04/2024', currency: 9800, amt: 2290},
    {Date: '14/04/2024', currency: 3908, amt: 2000},
    {Date: '13/04/2024', currency: 4800, amt: 2181},
    {Date: '12/04/2024', currency: 3800, amt: 2500},
    {Date: '11/04/2024', currency: 4300, amt: 2100},
  ];

const IncomeLineChartCard = ({ gridArea }) => {
    return ( 
        <Card gridArea={gridArea}>
        <CardHeader>
            <Flex justifyContent="center" alignItems="center">
                <Heading size='sm' textTransform='uppercase'>Income</Heading>
            </Flex>
            <Divider my={2} />
        </CardHeader>
        <CardBody>
            <Box p={4} boxShadow="base" rounded="md" bg="white" width="100%">
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <XAxis dataKey="Date" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="currency" stroke="#8884d8" />
                </LineChart>
                </ResponsiveContainer>
            </Box>
        </CardBody>
    </Card>
    );
}; 

const ExpenseLineChartCard = ({ gridArea }) => {
    return ( 
        <Card gridArea={gridArea}>
            <CardHeader>
            <Flex justifyContent="center" alignItems="center">
                <Heading size='sm' textTransform='uppercase'>Expense</Heading>
            </Flex>
                <Divider my={2} />
            </CardHeader>
            <CardBody>
            <Box p={4} boxShadow="base" rounded="md" bg="white" width="100%">
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <XAxis dataKey="Date" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="currency" stroke="#8884d8" />
                </LineChart>
                </ResponsiveContainer>
            </Box>
        </CardBody>
    </Card>
    );
}; 

const RecentRecordsCard = ({ gridArea }) => {
    return ( 
        <Card gridArea={gridArea}>
            <CardHeader>
                <Flex justifyContent="center" alignItems="center">
                    <Heading size='sm' textTransform='uppercase'>RecentRecords</Heading>
                </Flex>
                <Divider my={2} />
               
            </CardHeader>
            <CardBody>
            <Box>
                records1 17/04/2024
            </Box>
            <Divider my={12} />
            <Box>
                records2 15/04/2024
            </Box>
            <Divider my={12} />
            <Box>
                records3 1/04/2024
            </Box>
            </CardBody>
        </Card>
    );
}; 
// gridArea arguments: row-start/column-start/row-end/column-end
const RecordingPage = () => {
    return (
        <>
            <Grid templateColumns="1fr 3fr" gap={6}>
              <ProfileCard gridArea="1 / 1 / 1 / 2"> 
                <Heading size='sm' textTransform='uppercase'>Sam</Heading>
                <Text>Devs1</Text>
            </ProfileCard>
            <IncomeLineChartCard gridArea="1 / 2 / 1 / 4">
                <Text>Line Chart Data</Text> 
            </IncomeLineChartCard>
            <ExpenseLineChartCard gridArea="2 / 2 / 2 / 4">
                <Text>More Data Here</Text>
            </ExpenseLineChartCard>
            <RecentRecordsCard gridArea="2 / 1 / 2 / 2">
                <Text>Additional Info</Text>
            </RecentRecordsCard>
            </Grid>
                <GoToBillingPageButton />    
        </>
    );
};

export default RecordingPage;
