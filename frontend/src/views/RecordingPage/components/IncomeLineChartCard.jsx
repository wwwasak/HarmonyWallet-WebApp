import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Flex,
  Divider,
  Box
} from "@chakra-ui/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from 'react-router-dom';

const IncomeLineChartCard = ({ data }) => {
  const navigate = useNavigate();
    const handleCardClick = () => {
        navigate('/income-detail'); 
    };

  return (
    <Box onClick={handleCardClick} cursor="pointer" boxShadow="md" p="6" rounded="md" bg="white">
    <Card >
      <CardHeader>
        <Flex justifyContent="center" alignItems="center">
          <Heading size="sm" textTransform="uppercase">Income Records</Heading>
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
    </Box>
  );
};

export default IncomeLineChartCard;
