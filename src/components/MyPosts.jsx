import {
    HStack,
    Heading,
    SimpleGrid,
    Spinner,
    Stack,
    Text,
    VStack,
    useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import SinglePost from "./SinglePost";
import { useDispatch, useSelector } from "react-redux";
import { getUsersPost } from "../redux/postSlice";
import { Link, useNavigate } from "react-router-dom";

export const MyPosts = () => {
    const { userToken, userInfo } = useSelector((state) => state.auth);
    const { myPosts, status } = useSelector((state) => state.post);
    const dispatch = useDispatch();
    const toast = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch({ type: "header/setActiveTab", payload: "/myposts" });

        if (!userInfo.isLoggedIn) {
            navigate(`/posts`);
            return;
        }

        if (!myPosts.length) {
            dispatch(getUsersPost({ userToken }))
                .unwrap()
                .then(() => {
                    dispatch({
                        type: "post/setStatus",
                        payload: { name: "userpost", status: false },
                    });
                })
                .catch(() => {
                    dispatch({
                        type: "post/setStatus",
                        payload: { name: "userpost", status: false },
                    });
                    toast.closeAll();
                    toast({
                        title: "Error loading posts 😔",
                        status: "error",
                        isClosable: true,
                    });
                });
        }
        //eslint-disable-next-line
    }, []);

    return (
        <Stack
            w={"full"}
            pt={20}
            pb={12}
            minH={"80vh"}
            bgGradient="linear(to-br, pink.500, purple.500, purple.500)"
        >
            {myPosts.length === 0 && status.isUserPostsLoading ? (
                <HStack
                    w={"100%"}
                    h={"80vh"}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <Spinner size={"xl"} thickness="4px" />
                </HStack>
            ) : myPosts.length === 0 ? (
                <VStack
                    w={"full"}
                    h={"80vh"}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <Text fontSize={["xl", "2x"]} color={"white"}>
                        No posts yet 🙁!
                    </Text>
                    <Text fontSize={["xl", "2x"]} color={"white"}>
                        Let's create one 😃&nbsp;
                        <Link to={"/post"} style={{ color: "blue" }}>
                            click here !
                        </Link>
                    </Text>
                </VStack>
            ) : (
                <>
                    <Heading
                        my={8}
                        color={"white"}
                        fontFamily={"Poppins"}
                        fontSize={["2xl", "3xl", "4xl"]}
                        borderBottom={"2px solid #44337A"}
                        w={["60%", "50%", "40%", "30%", "15%"]}
                        pb={3}
                        px={1}
                        mx={8}
                    >
                        My posts
                    </Heading>
                    <SimpleGrid
                        w={"100%"}
                        minH={"80vh"}
                        mx={"auto"}
                        columns={{ sm: 1, md: 2 }}
                    >
                        {myPosts.toReversed().map((e) => {
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
                                    userPosts={true}
                                />
                            );
                        })}
                    </SimpleGrid>
                </>
            )}
        </Stack>
    );
};

export default MyPosts;
