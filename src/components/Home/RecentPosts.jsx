import {
    Avatar,
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    HStack,
    Heading,
    Stack,
    Text,
    VStack,
} from "@chakra-ui/react";
import React from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RenderHtmlComponent from "../RenderHtmlComponent";

const RecentPosts = () => {
    const { posts } = useSelector((state) => state.post);
    const postsFromLocalStorage = JSON.parse(localStorage.getItem("homePosts"));
    const homePosts = postsFromLocalStorage || posts;

    return (
        <section>
            <Box
                maxW={[
                    "container.sm",
                    "container.sm",
                    "container.md",
                    "container.lg",
                    "container.xl",
                ]}
                mx={["20px", "8%", "auto", "auto", "auto"]}
                my={20}
                bgColor={"gray.100"}
                borderRadius={"lg"}
                boxShadow={"lg"}
                py={16}
            >
                <Heading
                    as={"h2"}
                    mt={-2}
                    mb={6}
                    textAlign={"center"}
                    fontFamily={"sans-serif"}
                >
                    Recent Posts
                </Heading>

                <Box
                    display={"grid"}
                    maxW={"95%"}
                    mx={"auto"}
                    gridTemplateColumns={"repeat(auto-fit, minmax(300px, 1fr))"}
                    gap={5}
                >
                    {homePosts.slice(0, 3).map((e) => {
                        const desc = decodeURI(e.description).substring(0, 300);
                        return (
                            <PostCard
                                key={e._id}
                                id={e._id}
                                title={e.title}
                                description={desc}
                                author={e.author}
                            />
                        );
                    })}
                </Box>
            </Box>
            ;
        </section>
    );
};

const PostCard = ({ id, title, description, author }) => {
    const navigate = useNavigate();
    return (
        <Card variant={"outline"} minH={64} boxShadow={"xl"} px={2}>
            <CardHeader>
                <Heading as="h4" size={"md"}>
                    {title}
                </Heading>
                <HStack justifyContent={"flex-end"}></HStack>
            </CardHeader>
            <Divider></Divider>
            <CardBody>
                <VStack alignItems={"flex-start"}>
                    <RenderHtmlComponent
                        htmlContent={description}
                    ></RenderHtmlComponent>
                </VStack>
            </CardBody>
            <Divider></Divider>
            <CardFooter>
                <HStack justifyContent={"space-between"} w={"100%"}>
                    <Stack flexDirection={"row"} alignItems={"center"}>
                        <Avatar size={"xs"}></Avatar>
                        <Text fontSize={"xs"}>{author}</Text>
                    </Stack>
                    <Button
                        colorScheme="purple"
                        size={"sm"}
                        rightIcon={<HiOutlineArrowNarrowRight />}
                        onClick={() => {
                            navigate(`/posts/${id}`);
                        }}
                    >
                        Read more
                    </Button>
                </HStack>
            </CardFooter>
        </Card>
    );
};

// const dummyData = [
//     {
//         title: "This is a post to check if the card works properly",
//         description:
//             "I could have pasteh will be huuuhhh.... react is open source spa framework.",
//     },
//     {
//         title: "This is a post to check if the card works properly",
//         description:
//             "I could have paster the lorem epsum but I think it is okay to just keep writing  <PostCard /> <PostCard /> whatever is coming to mind which will be huuuhhh.... react is open source spa framework.",
//     },
//     {
//         title: "This is a post to check if the card works properly",
//         description:
//             "I could have paster the lorem epsum but I think it is okay to just keep writing whatever is coming to mind which will be huuuhhh.... react is open source spa framework.",
//     },
// ];

export default RecentPosts;
