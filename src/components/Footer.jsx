import { HStack, Text } from '@chakra-ui/react'
import React from 'react'

const Footer = () => {
    return (
        <HStack h={20} width={'full'} justifyContent={'center'} bgColor={'gray.900'} color={'white'} outline={'none'}>
            <Text textAlign={'center'}>Copyright &copy; 2023</Text>
        </HStack>
    )
}

export default Footer
