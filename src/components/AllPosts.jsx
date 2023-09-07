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
        <Stack
            w={"full"}
            pt={20}
            pb={12}
            minH={"80vh"}
            bgGradient="linear(to-br, pink.500, purple.500, purple.500, pink.500)"
        >
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
                    const desc = decodeURI(e.description).slice(0, 500) + "...";
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
