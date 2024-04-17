import { Card, CardHeader, CardBody, Grid, Text, Heading, Box, Button, Flex, Divider, Avatar } from "@chakra-ui/react";
import FloatWindow from "./FloatWindow";
const CardDisplay = ({ children, maxWidth }) => {
    
return (
        <Card maxW={maxWidth}>
            <CardHeader>
                <Flex justify="space-between" align="center">
                    <Heading size='sm' textTransform='uppercase'>Profile</Heading>
                    <Button variant='solid' colorScheme='blue' fontSize="xs" size="xs">
                        Edit
                    </Button>
                </Flex>
                <Divider my={2} />
                <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
                <Box pt={2}>
                    {children}
                </Box>
            </CardHeader>
            <CardBody>
                {/* CardBody Content */}
            </CardBody>
        </Card>
    );
} 

const RecordingPage = () => {
    return (
<Grid templateColumns="repeat(4, 1fr)" gap={6}>
            <CardDisplay maxWidth="xs" gridArea="1 / 1 / 2 / 2"> {/* Grid area for xs */}
                <Heading size='sm' textTransform='uppercase'>Sam</Heading>
                <Text>Devs</Text>
            </CardDisplay>
            <CardDisplay maxWidth="md" gridArea="1 / 2 / 2 / 3"> {/* Grid area for md */}
                <Heading size='sm' textTransform='uppercase'>Sam</Heading>
                <Text>Devs</Text>
            </CardDisplay>
            <CardDisplay maxWidth="md" gridArea="1 / 3 / 2 / 4"> {/* Grid area for md */}
                <Heading size='sm' textTransform='uppercase'>Sam</Heading>
                <Text>Devs</Text>
            </CardDisplay>
            <CardDisplay maxWidth="xs" gridArea="1 / 4 / 2 / 5"> {/* Grid area for xs */}
                <Heading size='sm' textTransform='uppercase'>Sam</Heading>
                <Text>Devs</Text>
            </CardDisplay>
           <FloatWindow/>
        </Grid>
    );
  };

export default RecordingPage;
