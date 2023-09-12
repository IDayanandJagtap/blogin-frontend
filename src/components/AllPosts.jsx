import {
    Box,
    HStack,
    useToast,
    Stack,
    Button,
    Spinner,
    Text,
    VStack,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../redux/postSlice";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import SinglePost from "./SinglePost";

export const AllPosts = () => {
    const { posts, pageNo, status } = useSelector((state) => state.post);
    const dispatch = useDispatch();
    const toast = useToast();

    const handleGoToFirst = () => {
        dispatch({
            type: "post/setStatus",
            payload: { name: "allposts", status: true },
        });
        dispatch({ type: "post/setPageNo" });
    };

    const handleOnPrevious = () => {
        dispatch({
            type: "post/setStatus",
            payload: { name: "allposts", status: true },
        });
        dispatch({ type: "post/setPageNo", payload: "decrement" });
    };
    const handleOnNext = () => {
        dispatch({
            type: "post/setStatus",
            payload: { name: "allposts", status: true },
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
            {status.isAllPostsLoading ? (
                <HStack
                    w={"100%"}
                    h={"80vh"}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <Spinner size={"xl"} thickness="4px" />
                </HStack>
            ) : posts.length === 0 ? (
                <VStack
                    w={"100%"}
                    h={"80vh"}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <Text
                        fontSize={["xl", "2xl"]}
                        textAlign={"center"}
                        lineHeight={2}
                        color={"whiteAlpha.800"}
                    >
                        Congratulations! You've explored all the latest blogs.😃
                        <br></br>
                        Feel free to check back soon for new and exciting
                        content.😊
                    </Text>
                    <br></br>
                    <Text
                        onClick={handleGoToFirst}
                        fontSize={["xl", "2xl"]}
                        textAlign={"center"}
                        lineHeight={2}
                        color={"blue.900"}
                        cursor={"pointer"}
                    >
                        Go to first page!
                    </Text>
                </VStack>
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
                            <SinglePost
                                key={e._id}
                                id={e._id}
                                title={e.title}
                                description={desc}
                                author={e.author}
                                createdAt={e.createdAt}
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

export default AllPosts;
