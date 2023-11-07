'use client'

import {
    Heading,
    Avatar,
    Box,
    Center,
    Image,
    Flex,
    Text,
    Stack,
    Button,
    useColorModeValue,
    Tag,
    HStack,
} from '@chakra-ui/react'
import DeleteCustomerAlert from './AlertDialogue'
import UpdateCustomerDrawer from './UpdateCustomerDrawer'

export default function CardWithImage({ id, name, email, age, gender, fetchCustomers }) {
    const profileImageUrl = getProfileUrl(id, gender)
    return (
        <Center py={6}>
            <Box
                maxW={'300px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'md'}
                overflow={'hidden'}>
                <Image
                    h={'120px'}
                    w={'full'}
                    src={
                        'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
                    }
                    objectFit="cover"
                    alt="#"
                />
                <Flex justify={'center'} mt={-12}>
                    <Avatar
                        size={'xl'}
                        src={
                            profileImageUrl
                        }
                        css={{
                            border: '2px solid white',
                        }}
                    />
                </Flex>

                <Box p={6}>
                    <Stack spacing={2} align={'center'} mb={5}>
                        <Tag>{id}</Tag>
                        <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                            {name}
                        </Heading>
                        <Text color={'gray.500'}>{email}</Text>
                        <Text color={'gray.500'}>{age} | | {gender}</Text>
                    </Stack>
                </Box>
                <HStack align={'center'} mb={5} justify={'center'}>
                    <DeleteCustomerAlert
                        id={id}
                        fetchCustomers={fetchCustomers}
                    >
                    </DeleteCustomerAlert>
                    <UpdateCustomerDrawer
                        initialValues={{
                            id: id,
                            name: name,
                            email: email,
                            age: age
                        }
                        }
                        fetchCustomers={fetchCustomers}
                    >
                    </UpdateCustomerDrawer>
                </HStack>

            </Box>
        </Center>
    )
}

const convertGenderToSex = (gender) => {
    gender = gender.toLowerCase()
    console.log("gender :" + gender)

    if (gender === "male") {
        return 'men'
    }

    if (gender === "female") {
        return 'women'
    }
}

const getProfileUrl = (id, gender) => {
    const sex = convertGenderToSex(gender)
    const url = `https://randomuser.me/api/portraits/med/${sex}/${id}.jpg`
    console.log("url: " + url)
    return url
}