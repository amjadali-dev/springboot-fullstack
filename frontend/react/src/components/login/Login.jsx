'use client'

import {
    Button,
    Checkbox,
    Flex,
    Text,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Image,
} from '@chakra-ui/react'
import LoginForm from './LoginForm'
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function Login() {
    const { isCustomerAuthenticated } = useContext(AuthContext)
    const navigate=useNavigate()

    useEffect(()=>{
        if(isCustomerAuthenticated()){
            navigate("/dashboard")
        }

    },[])

    return (
        <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Stack spacing={4} w={'full'} maxW={'md'} >
                    <Heading fontSize={'2xl'} mb={4}>Sign in to your account</Heading>
                    <LoginForm />
                </Stack>
            </Flex>
            <Flex flex={1}
                p={10}
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                bgGradient={{ sm: 'linear(to-r, blue.600, purple.600)' }}>

                <Text fontSize={"6xl"} color={'white'} fontWeight={"bold"} mb={5}>
                    Enrol now
                </Text>
                <Image
                    alt={'Login Image'}
                    objectFit={'scale-down'}
                    src={
                        'https://user-images.githubusercontent.com/40702606/215539167-d7006790-b880-4929-83fb-c43fa74f429e.png'
                    }
                />

            </Flex>
        </Stack>
    )
}