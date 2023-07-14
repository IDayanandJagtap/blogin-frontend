import React from 'react'
import { Link } from 'react-router-dom'
import { HStack, Text } from "@chakra-ui/react"
import { AiOutlineShoppingCart } from "react-icons/ai"
import { useSelector } from 'react-redux'

const Header = () => {
    const { cartItems } = useSelector(state => state.cart)
    const noOfCartItems = cartItems.length

    return (
        <nav >
            <HStack justifyContent={"space-between"} width={'full'} px={12} py={2} bgColor={'red.500'} color={'whiteAlpha.900'}>
                <Text fontSize={'4xl'} fontWeight={'semibold'}>Cart</Text>
                <HStack gap={8}>
                    <Text fontSize={'xl'}>  <Link to="/">Home</Link></Text>
                    <Link to="/cart" style={{ position: "relative" }}>
                        <AiOutlineShoppingCart size={32} />
                        {
                            noOfCartItems > 0
                                ? <Text display={'grid'} placeContent={'center'} borderRadius={'full'} bg={'white'} color={'black'} fontSize={'sm'} position={'absolute'} right={-2} bottom={-1} width={5} height={5}>{noOfCartItems}</Text>
                                : <Text display={'none'}></Text>
                        }

                    </Link>
                </HStack>
            </HStack >
        </nav>
    )
}

export default Header
