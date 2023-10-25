import { Button, ButtonGroup, Spinner, Text, Wrap, WrapItem } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { getCustomers } from './services/client';
import SidebarWithHeader from './components/shared/sidebar';
import CardWithImage from './components/Card';


const App = () => {

    const [customers, setCustomers] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getCustomers().then(res => {
            setCustomers(res.data)
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    //return this html when api is loading
    if (loading) {
        return (
            <SidebarWithHeader>
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                />
            </SidebarWithHeader>
        )
    }

    //return this html when api returns zero customers
    if (customers.length === 0) {
        return (
            <SidebarWithHeader>
                <Text>
                    No customers available
                </Text>
            </SidebarWithHeader>
        )
    }

    //return this html otherwise(after sueccesfully getting response from api with more than zero customers)
    return (
        <SidebarWithHeader>
            <Wrap spacing="7" justify="center">
                {customers.map((customer, index) =>
                    <WrapItem key={index}>
                        <CardWithImage
                            {...customer}
                        />
                    </WrapItem>
                )}
            </Wrap>
        </SidebarWithHeader>
    )
}

export default App;
