import { Box, HStack, Spinner, Stack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import SinglePost from "./SinglePost";
import { useDispatch } from "react-redux";

export const MyPosts = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: "header/setActiveTab", payload: "/myposts" });
    });
    return (
        <Stack
            w={"full"}
            pt={20}
            pb={12}
            minH={"80vh"}
            bgGradient="linear(to-br, pink.500, purple.500, purple.500)"
        >
            {posts.length === 0 ? (
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
                </Box>
            )}
        </Stack>
    );
};

const posts = [];

export default MyPosts;
