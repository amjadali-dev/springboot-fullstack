import { Button, ButtonGroup, Spinner, Text, Wrap, WrapItem } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { getCustomers } from './services/client';
import SidebarWithHeader from './components/shared/Sidebar';
import CardWithImage from './components/customer/Card';
import CreateCustomerDrawer from './components/customer/CreateCustomerDrawer';


const App = () => {

    const [customers, setCustomers] = useState([])
    const [loading, setLoading] = useState(false);

    const fetchCustomers = () => {
        console.log("running fetchCustomers")
        setLoading(true);
        getCustomers().then(res => {
            setCustomers(res.data)
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        fetchCustomers()
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
                <CreateCustomerDrawer 
                  fetchCustomers={fetchCustomers}
                />
                <Text mt={3}>
                    No customers available
                </Text>
            </SidebarWithHeader>
        )
    }

    //return this html otherwise(after sueccesfully getting response from api with more than zero customers)
    return (
        <SidebarWithHeader>
            <CreateCustomerDrawer
                fetchCustomers={fetchCustomers}
            />


            <Wrap spacing="7" justify="center">
                {customers.map((customer, index) =>
                    <WrapItem key={index}>
                        <CardWithImage
                            {...customer}
                            fetchCustomers={fetchCustomers}
                        />
                    </WrapItem>
                )}
            </Wrap>

        </SidebarWithHeader>
    )
}

export default App;
