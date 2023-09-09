import {
    Avatar,
    Box,
    Divider,
    HStack,
    Heading,
    Text,
    VStack,
    useToast,
    Stack,
    Button,
    Spinner,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import RenderHtmlComponent from "./RenderHtmlComponent";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../redux/postSlice";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";

export const AllPosts = () => {
    const { posts, pageNo, status } = useSelector((state) => state.post);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();

    const handleOnPrevious = () => {
        dispatch({
            type: "post/setStatus",
            payload: { isAllPostLoading: true },
        });
        dispatch({ type: "post/setPageNo", payload: "decrement" });
    };
    const handleOnNext = () => {
        dispatch({
            type: "post/setStatus",
            payload: { isAllPostLoading: true },
        });
        dispatch({ type: "post/setPageNo", payload: "increment" });
    };

    useEffect(() => {
        if (pageNo < 1)
            dispatch({ type: "post/setPageNo", payload: "initialise" }); // avoid negative indices

        dispatch({ type: "header/setActiveTab", payload: "/posts" });
        dispatch(getPosts({ pageno: pageNo || 1 }))
            .unwrap()
            .then((e) => {})
            .catch((e) => {
                toast({
                    title: "Something went wrong while loding the posts 😔",
                    status: "error",
                    position: "top",
                    isClosable: true,
                });
            });
        // eslint-disable-next-line
    }, [pageNo]);

    return (
        <Stack
            w={"full"}
            pt={20}
            pb={12}
            minH={"80vh"}
            bgGradient="linear(to-br, pink.500, purple.500, purple.500)"
        >
            {posts.length === 0 || status.isAllPostLoading ? (
                <HStack
                    w={"100%"}
                    h={"80vh"}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <Spinner size={"xl"} thickness="4px" />
                </HStack>
            ) : (
                <Box
                    maxW={[
                        "container.sm",
                        "container.sm",
                        "container.md",
                        "container.lg",
                        "container.xl",
                    ]}
                    minH={"80vh"}
                    mx={"auto"}
                >
                    {posts.map((e) => {
                        const desc =
                            decodeURI(e.description).slice(0, 500) + "...";
                        return (
                            <Post
                                key={e._id}
                                id={e._id}
                                title={e.title}
                                description={desc}
                                author={e.author}
                                createdAt={e.createdAt}
                                navigate={navigate}
                            />
                        );
                    })}

                    <HStack p={6} justifyContent={"space-between"}>
                        <Button
                            isDisabled={pageNo === 1}
                            leftIcon={<BsArrowLeft />}
                            colorScheme="blackAlpha"
                            onClick={handleOnPrevious}
                        >
                            Previous
                        </Button>
                        <Button
                            isDisabled={posts.length < 5}
                            rightIcon={<BsArrowRight />}
                            colorScheme="blackAlpha"
                            onClick={handleOnNext}
                        >
                            Next
                        </Button>
                    </HStack>
                </Box>
            )}
        </Stack>
    );
};

const Post = ({ id, title, description, author, createdAt, navigate }) => {
    const date = new Date(createdAt).toDateString();

    return (
        <VStack
            w={"95%"}
            mx={"auto"}
            my={10}
            p={6}
            bgColor={"gray.50"}
            cursor={"pointer"}
            borderRadius={"lg"}
            transition={"transform 0.2s linear"}
            _hover={{ transform: "scale(1.03)" }}
            onClick={() => {
                navigate(`/posts/${id}`);
            }}
        >
            <HStack w={"full"} justifyContent={"flex-start"} py={2}>
                <Heading
                    fontFamily={"Roboto"}
                    fontSize={["xl", "xl", "2xl", "3xl"]}
                >
                    {title}
                </Heading>
            </HStack>
            <Divider borderColor={"blackAlpha.400"}></Divider>
            <HStack w={"full"} p={2} justifyContent={"flex-start"}>
                <RenderHtmlComponent htmlContent={description} />
            </HStack>
            <Divider borderColor={"blackAlpha.400"}></Divider>
            <HStack w={"full"} justifyContent={"space-between"} p={2}>
                <HStack>
                    {" "}
                    <Avatar
                        size={["2xs", "xs", "xs", "sm"]}
                        bg={"blackAlpha.800"}
                    ></Avatar>
                    <Text
                        color={"blackAlpha.800"}
                        fontSize={["xs", "xs", "sm"]}
                        fontWeight={["normal"]}
                        fontFamily={"Baloo 2"}
                    >
                        {author}
                    </Text>
                </HStack>
                <Text color={"blackAlpha.600"} fontSize={["xs", "xs", "sm"]}>
                    ~ {createdAt ? date : ""}{" "}
                </Text>
            </HStack>
        </VStack>
    );
};

export default AllPosts;
