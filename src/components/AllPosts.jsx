import {
    Avatar,
    Box,
    Divider,
    HStack,
    Heading,
    Text,
    VStack,
    useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import RenderHtmlComponent from "./RenderHtmlComponent";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../redux/postSlice";

export const AllPosts = () => {
    const { posts } = useSelector((state) => state.post);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        dispatch({ type: "header/setActiveTab", payload: "/posts" });
        dispatch(getPosts())
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
    });

    return (
        <Box
            maxW={[
                "container.sm",
                "container.sm",
                "container.md",
                "container.lg",
                "container.xl",
            ]}
            minH={"80vh"}
            mt={24}
            mx={"auto"}
        >
            {posts.map((e) => {
                const desc = decodeURI(e.description).slice(0, 1000) + "...";
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
        </Box>
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
            bgGradient="linear(to-br, cyan.300, purple.400)"
            cursor={"pointer"}
            borderRadius={"lg"}
            boxShadow={"2px 2px 5px #b4b4b4"}
            transition={"transform 0.2s linear"}
            _hover={{ transform: "scale(1.03)" }}
            onClick={() => {
                navigate(`/posts/${id}`);
            }}
        >
            <HStack w={"full"} justifyContent={"flex-start"} py={2}>
                <Heading fontFamily={"Roboto"}>{title}</Heading>
            </HStack>
            <Divider></Divider>
            <HStack w={"full"} p={2} justifyContent={"flex-start"}>
                <Text
                    fontFamily={"Baloo 2"}
                    lineHeight={1.5}
                    fontSize={"lg"}
                    letterSpacing={1.1}
                >
                    <RenderHtmlComponent htmlContent={description} />
                </Text>
            </HStack>
            <Divider></Divider>
            <HStack w={"full"} justifyContent={"space-between"} p={2}>
                <HStack>
                    {" "}
                    <Avatar size={"xs"} bg={"blackAlpha.800"}></Avatar>
                    <Text
                        color={"blackAlpha.800"}
                        fontSize={"md"}
                        fontWeight={"semibold"}
                        fontFamily={"Baloo 2"}
                    >
                        {author}
                    </Text>
                </HStack>
                <Text color={"blackAlpha.600"}>~ {createdAt ? date : ""} </Text>
            </HStack>
        </VStack>
    );
};

export default AllPosts;
