import React, { useEffect } from 'react'
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
    Box,
    Text,
} from '@chakra-ui/react'

const Signup = ({ openModal, setOpenModal }) => {
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
                    Signup
                    <Box h={.5} bgColor={'purple.100'} w={'100%'} mt={5}></Box>
                </ModalHeader>
                <ModalCloseButton onClick={() => setOpenModal(false)} />
                <ModalBody>

                    <form method=''>
                        <VStack gap={5} alignContent={'flex-start'}>
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

export default Signup
