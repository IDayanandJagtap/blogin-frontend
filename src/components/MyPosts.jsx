import { HStack, SimpleGrid, Spinner, Stack, useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import SinglePost from "./SinglePost";
import { useDispatch, useSelector } from "react-redux";
import { getUsersPost } from "../redux/postSlice";
import { useNavigate } from "react-router-dom";

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
                        payload: { isPostsLoading: false },
                    });
                })
                .catch(() => {
                    dispatch({
                        type: "post/setStatus",
                        payload: { isPostsLoading: false },
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
            {myPosts.length === 0 || status.isPostsLoading ? (
                <HStack
                    w={"100%"}
                    h={"80vh"}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <Spinner size={"xl"} thickness="4px" />
                </HStack>
            ) : (
                <SimpleGrid
                    w={"100%"}
                    minH={"80vh"}
                    mx={"auto"}
                    columns={{ sm: 1, md: 2 }}
                >
                    {myPosts.map((e) => {
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
            )}
        </Stack>
    );
};

export default MyPosts;
