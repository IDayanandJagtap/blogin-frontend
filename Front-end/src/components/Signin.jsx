import React, { useEffect } from 'react'
import Signup from './Signup'
import Login from './Login'


import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Input,
    VStack,
    FormLabel,
    FormControl,
    HStack,
    Text,
    Stack,
    Heading,
    Flex,
} from '@chakra-ui/react'

const Signin = ({ openModal, setOpenModal }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        if (openModal)
            onOpen();
        setOpenModal(false)
        //eslint-disable-next-line
    }, [openModal])

    const handleOnClose = () => {
        setOpenModal(false);
        onClose();
    }



    return (
        <Modal isOpen={isOpen} onClose={handleOnClose} b>
            {/* <Button onClick={onOpen} ref={btnRef} clicked={openModal}></Button> */}
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>

                </ModalHeader>
                <ModalCloseButton onClick={() => setOpenModal(false)} />
                <ModalBody>
                    <Flex justifyContent={'space-between'} mt={-4} cursor={'pointer'}>
                        <Stack w={'full'} py={2} bgColor={'purple.100'}>
                            <Text textAlign={'center'} fontSize={'2xl'} fontWeight={'500'} >Login</Text>
                        </Stack>
                        <Stack w={'full'} borderBottom={'2px solid purple'} py={2}>
                            <Text textAlign={'center'} fontSize={'2xl'} fontWeight={'500'}>Signup</Text>
                        </Stack>
                    </Flex>
                    <form method=''>
                        <VStack gap={5} alignContent={'flex-start'} mt={8}>
                            <FormControl>
                                <FormLabel>Name</FormLabel>
                                <Input type='text' focusBorderColor={'purple'} placeholder='John Doe' name='name' />
                            </FormControl>
                            <FormControl>
                                <FormControl>Email</FormControl>
                                <Input type='email' focusBorderColor={'purple'} placeholder='john@doe.com' name='email' />

                            </FormControl>
                            <FormControl>
                                <FormControl>Password</FormControl>
                                <Input type='password' focusBorderColor={'purple'} placeholder='********' name='password' />
                            </FormControl>
                            <FormControl>
                                <FormControl>Confirm password</FormControl>
                                <Input type='password' focusBorderColor={'purple'} placeholder='********' name='cpassword' />
                            </FormControl>
                        </VStack>
                    </form>
                </ModalBody>

                <ModalFooter>
                    <VStack gap={3} w={'full'}>
                        <Button variant={'solid'} colorScheme='purple' alignSelf={'flex-end'}>Signup</Button>
                        <Text fontSize={'sm'} textAlign={'center'}>Already have an account ? <Button variant={"link"} colorScheme='purple'> Login here</Button></Text>

                    </VStack>
                </ModalFooter>
            </ModalContent>

        </Modal >
    )
}

export default Signin

