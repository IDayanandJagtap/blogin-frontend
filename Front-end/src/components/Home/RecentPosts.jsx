import {
    Avatar,
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    HStack,
    Heading,
    Stack,
    Text,
    VStack,
} from "@chakra-ui/react";
import React from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

const RecentPosts = () => {
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
                py={8}
            >
                <Heading
                    as={"h2"}
                    my={6}
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
                    {dummyData.map((e, i) => {
                        return (
                            <PostCard
                                key={i}
                                title={e.title}
                                description={e.description.substring(0, 300)}
                            />
                        );
                    })}
                </Box>
            </Box>
            ;
        </section>
    );
};

const PostCard = ({ title, description }) => {
    let shortDesc = description;
    return (
        <Card variant={"outline"} minH={64} boxShadow={"xl"}>
            <CardHeader>
                <Heading as="h4" size={"md"}>
                    {title}
                </Heading>
                <HStack justifyContent={"flex-end"}></HStack>
            </CardHeader>
            <CardBody>
                <VStack alignItems={"flex-start"}>
                    <Text>
                        {shortDesc}
                        {shortDesc.length < 300 ? "" : "..."}
                    </Text>
                </VStack>
            </CardBody>
            <CardFooter>
                <HStack justifyContent={"space-between"} w={"100%"}>
                    <Stack flexDirection={"row"} alignItems={"center"}>
                        <Avatar size={"xs"}></Avatar>
                        <Text fontSize={"xs"}>Author</Text>
                    </Stack>
                    <Button
                        colorScheme="purple"
                        size={"sm"}
                        rightIcon={<HiOutlineArrowNarrowRight />}
                    >
                        Read more
                    </Button>
                </HStack>
            </CardFooter>
        </Card>
    );
};

const dummyData = [
    {
        title: "This is a post to check if the card works properly",
        description:
            "I could have pasteh will be huuuhhh.... react is open source spa framework.",
    },
    {
        title: "This is a post to check if the card works properly",
        description:
            "I could have paster the lorem epsum but I think it is okay to just keep writing  <PostCard /> <PostCard /> whatever is coming to mind which will be huuuhhh.... react is open source spa framework.",
    },
    {
        title: "This is a post to check if the card works properly",
        description:
            "I could have paster the lorem epsum but I think it is okay to just keep writing whatever is coming to mind which will be huuuhhh.... react is open source spa framework.",
    },
    {
        title: "This is a post to check if the card works properly",
        description:
            "I could have paster the lorem epsum but I think it is okay to just keep writing whatever is coming to mind which will be huuuhhh.... react is open source spa framework.",
    },
    {
        title: "This is a post to check if the card works properly",
        description:
            "I could have paster the lorem epsum but I think it is okay to add content to some page without knowing it is harmful thing for you too and for the viewers too just keep writing whatever is coming to mind which will be huuuhhh.... react is open source spa framework.",
    },
    {
        title: "This is a post to check if the card works properly",
        description:
            "I could have paster the lorem epsum but I think it is okay to just keep writing whatever is coming to mind which will be huuuhhh.... react is open source spa framework.",
    },
];

export default RecentPosts;
