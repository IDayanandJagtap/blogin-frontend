import { Box, HStack, Image, Stack, Heading, Text, VStack, Button, useToast } from '@chakra-ui/react'
import React from 'react'
import { useDispatch } from 'react-redux';


const img1 =
    "https://www.reliancedigital.in/medias/Apple-MGN63HNA-Laptops-491946461-i-1-1200Wx1200H?context=bWFzdGVyfGltYWdlc3wxNzczNDJ8aW1hZ2UvanBlZ3xpbWFnZXMvaDVhL2gyZC85NDQzMDgzNTgzNTE4LmpwZ3xhYzRiNWIxZGQ2NjNiNWIyYjI0Y2ZkYTZlZWQ3MTFjZTMxYzVmNDBiNmM5Mzk5OTM2OGVkZmExMjMyYjIxNDQ4";
const img2 =
    "https://cdn.shopify.com/s/files/1/2428/5565/products/Neemans-HaleBlack-ReLive-Knits-Jogger-FrontRightLogo-Comfortable-Shoes_1024x.jpg?v=1662876260";

const Home = () => {
    const dispatch = useDispatch()
    const toast = useToast()

    const productItems = [{ name: "Macbook", price: 1000, id: "21", imgSrc: img1 },
    { name: "Black shoes", price: 399, id: "31", imgSrc: img2 }];


    // In case if data was fetched from the server then there was no need to accept other params than id
    // As the data is not coming from the server, we have to store the state variable data in localstorage so we can access the cartItems even after a refresh.
    const addToCartHandler = (options) => {
        dispatch({ type: "addToCart", payload: options })
        dispatch({ type: "calculatePrice" })

        toast({
            title: "Item added to cart.",
            status: 'success',
            duration: 1500
        })
    }


    return (
        <Box maxW={'container.2xl'} height={["fit-content"]} p={10} bgColor={'gray.800'} >
            {productItems.map(e => {
                return <ProductCard key={e.id} name={e.name} price={e.price} imgSrc={e.imgSrc} id={e.id} handler={addToCartHandler}
                />
            })}
        </Box>
    )
}

const ProductCard = ({ id, name, price, imgSrc, handler }) => (
    <Stack w={['85%']} h={['fit-content', 'fit-content', 'xs']} color={'black'} bgColor={'white'} mx={'auto'} my={10} borderRadius={'2xl'} px={5} pt={4} pb={5} justifyContent={'space-between'} flexDirection={['column', 'column', 'row']} >
        <Stack flexDirection={['column', 'column', 'row']} alignItems={'center'} >
            <Image src={imgSrc} w={56} h={56} objectFit={'contain'} />
            <VStack margin={[0, 0, 4]}>
                <Heading as={'h4'} fontSize={'2xl'} textAlign={'center'}>{name}</Heading>
                <Text>${price}</Text>
            </VStack>
        </Stack>
        <HStack w={'full'} h={'full'} alignItems={['center', 'center', 'flex-end']} pt={[5, 5, 0]} justifyContent={['center', 'center', 'flex-end']}>
            <Button colorScheme={'red'} onClick={() => handler({ id, name, price, imgSrc, quantity: 1 })}>Add to cart</Button>

        </HStack>

    </Stack>
)



export default Home
