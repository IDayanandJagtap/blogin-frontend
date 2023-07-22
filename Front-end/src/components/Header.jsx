import { Box, Button, HStack, Heading, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Signin from './Signin'

const Header = () => {

    const [openModal, setOpenModal] = useState(false)


    const handleOnSignupClick = () => {
        setOpenModal(true);
    }

    return (
        <header>
            <Box maxW={'100vw'} h={'100vh'} border={'1px solid black'} >
                <nav>
                    <HStack justifyContent={'space-between'} p={4}>
                        <Heading as={'h1'} fontFamily={'cursive'}>Blogin</Heading>
                        <HStack gap={8}>
                            <Link to={'/'}><Text fontSize={'lg'}>Home</Text></Link>
                            <Link to={'/'}><Text fontSize={'lg'}>Posts</Text></Link>
                            <Link to={'/'}><Text fontSize={'lg'}>Post</Text></Link>

                            <Button colorScheme='purple' mx={4} onClick={handleOnSignupClick}>Signup</Button>
                        </HStack>
                    </HStack>
                </nav>
            </Box>

            <Signin openModal={openModal} setOpenModal={setOpenModal} />
        </header>
    )
}

export default Header
