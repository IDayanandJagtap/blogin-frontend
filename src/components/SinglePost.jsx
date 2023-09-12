import {
    Avatar,
    Divider,
    HStack,
    Heading,
    Text,
    VStack,
} from "@chakra-ui/react";
import React from "react";
import RenderHtmlComponent from "./RenderHtmlComponent";
import { useNavigate } from "react-router-dom";

const SinglePost = ({ id, title, description, author, createdAt }) => {
    const date = new Date(createdAt).toDateString();
    const navigate = useNavigate();

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
                    ~ {createdAt ? date : ""}
                </Text>
            </HStack>
        </VStack>
    );
};

export default SinglePost;
