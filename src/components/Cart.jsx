import { HStack, Stack, Image, Heading, Text, VStack, Button, useToast } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiFillDelete } from 'react-icons/ai'


const Cart = () => {
    const { cartItems, subTotal, shipping, taxes, total } = useSelector(state => state.cart)

    const dispatch = useDispatch();
    const toast = useToast();

    useEffect(() => {
        dispatch({ type: 'calculatePrice' })

        //eslint-disable-next-line
    }, [])

    const incrementHandler = (id) => {
        dispatch({ type: "incrementQty", payload: id })
        dispatch({ type: 'calculatePrice' })
    }
    const decrementHandler = (id, quantity) => {
        dispatch({ type: "decrementQty", payload: id })
        dispatch({ type: 'calculatePrice' })

        // Remove the element once the quantity is 0
        if (quantity === 1)
            deleteHandler(id)

    }
    const deleteHandler = (id) => {
        dispatch({ type: "deleteItem", payload: id })
        dispatch({ type: 'calculatePrice' })

        toast({
            title: "Item removed from cart !",
            status: "error",
            duration: 1500
        })
    }

    return (

        <Stack w={'full'} h={['90vh']} flexDirection={['column', 'column', 'row']} gap={0} bgColor={'gray.800'} >
            <VStack w={['100%', '100%', '70%']} h={'full'} overflow={'auto'} sx={
                {
                    '::-webkit-scrollbar': {
                        display: 'none'
                    }
                }
            }>

                {
                    cartItems.length > 0
                        ? cartItems.map((e) => {
                            return <CartItem key={e.id} name={e.name} price={e.price} imgSrc={e.imgSrc} id={e.id} quantity={e.quantity} incrementHandler={incrementHandler} decrementHandler={decrementHandler} deleteHandler={deleteHandler} />
                        })

                        : <Text textAlign={'center'} my={'auto'} color={'white'}>No items to display!<br /> Please add some items to cart.</Text>
                }



            </VStack>

            <VStack w={['100%', '100%', '30%']} height={['30%', '50%', 'full']} bgColor={'gray.900'} borderLeft={'1px solid rgba(0,0,0,0.3)'} borderRadius={['50px 50px 0 0', '50px 50px 0 0', '0']} alignItems={'center'} justifyContent={'center'} color={'whiteAlpha.900'} p={[4, 4, 0]}>
                <Text fontSize={'lg'} >Subtotal : ${subTotal}</Text>
                <Text fontSize={'lg'} >Shipping : ${shipping}</Text>
                <Text fontSize={'lg'} >Tax : ${taxes}</Text>
                <Text as={'h3'} mt={3} fontSize={'2xl'}>Total : ${total}</Text>
            </VStack>
        </Stack>

    )
}

const CartItem = ({ id, name, price, imgSrc, quantity = 1, incrementHandler, decrementHandler, deleteHandler }) => (
    <Stack w={['85%']} h={['fit-content', 'fit-content', 'xs']} color={'black'} bgColor={'white'} mx={'auto'} my={10} borderRadius={'2xl'} px={5} pt={4} pb={5} justifyContent={'space-between'} flexDirection={['column', 'column', 'row']} >
        <Stack flexDirection={['column', 'column', 'row']} alignItems={'center'} >
            <Image src={imgSrc} w={56} h={56} objectFit={'contain'} />
            <VStack margin={[0, 0, 4]}>
                <Heading as={'h4'} fontSize={'2xl'} textAlign={'center'}>{name}</Heading>
                <Text>${price}</Text>
            </VStack>
        </Stack>
        <HStack w={['full', 'full', '35%']} h={'full'} alignItems={['center', 'center', 'flex-end']} pt={[5, 5, 0]} justifyContent={['space-between']}>
            <HStack>
                <Button colorScheme='red' onClick={() => decrementHandler(id, quantity)}>-</Button>
                <Text >{quantity}</Text>
                <Button colorScheme='red' onClick={() => incrementHandler(id)}>+</Button>
            </HStack>

            <AiFillDelete size='36' cursor={'pointer'} onClick={() => deleteHandler(id)} />

        </HStack>

    </Stack>
)

export default Cart
