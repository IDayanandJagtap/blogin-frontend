import {
    Avatar,
    Box,
    Divider,
    HStack,
    Heading,
    Spinner,
    Stack,
    Text,
    VStack,
    useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RenderHtmlComponent from "./RenderHtmlComponent";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePost } from "../redux/postSlice";

const DetailedPost = () => {
    const { posts } = useSelector((state) => state.post);
    const { id } = useParams();
    const toast = useToast();
    const dispatch = useDispatch();
    const [status, setStatus] = useState({ isLoading: true });
    const [currentPost, setCurrentPost] = useState(null);

    const emptyPost = {
        title: "",
        description: "",
        author: "",
        createdAt: "",
    };

    let { title, description, author, createdAt } = currentPost || emptyPost;
    description = decodeURI(description);

    const date = new Date(createdAt).toDateString();

    useEffect(() => {
        window.scrollTo(0, 0);

        dispatch({
            type: "header/setActiveTab",
            payload: "/post",
        });

        const post = posts.filter((e) => {
            return id === e._id;
        });

        if (post.length !== 0) {
            setCurrentPost(post[0]);
            setStatus({ isLoading: false });
        }

        if (post.length === 0 && currentPost === null) {
            setStatus({ isLoading: true });
            dispatch(getSinglePost({ id: id }))
                .unwrap()
                .then((e) => {
                    setCurrentPost(e.post);
                    setStatus({ isLoading: false });
                })
                .catch(() => {
                    toast({
                        title: "Post not found ",
                        status: "error",
                        position: "top",
                    });
                });
        }
        //eslint-disable-next-line
    }, [currentPost]);
    return (
        <Stack
            w={"full"}
            pt={20}
            pb={12}
            flexDirection={["column", "column", "column", "row"]}
            minH={"80vh"}
            bgGradient="linear(to-br, blue.800, purple.600, pink.500)"
        >
            {status.isLoading ? (
                <HStack
                    h={"80vh"}
                    w={"full"}
                    alignItems={"center"}
                    justifyContent={"center"}
                >
                    <Spinner thickness="4px" size="xl"></Spinner>
                </HStack>
            ) : (
                <>
                    <Box
                        w={["96%", "96%", "96%", "70%"]}
                        mx={["auto", "auto", "auto", 6]}
                        p={6}
                        my={8}
                        h={"fit-content"}
                        borderRadius={"md"}
                        style={{ backgroundColor: "#F7FAFC" }}
                    >
                        <VStack w={"full"} alignItems={"flex-start"}>
                            <Heading
                                fontFamily={"Poppins"}
                                textAlign={"center"}
                                w={"full"}
                                py={3}
                                fontSize={["xl", "xl", "2xl", "3xl"]}
                            >
                                {title}
                            </Heading>
                            <Divider borderColor={"blackAlpha.400"}></Divider>
                            <RenderHtmlComponent htmlContent={description} />
                            <Divider
                                borderColor={"blackAlpha.400"}
                                py={4}
                            ></Divider>
                            <HStack
                                w={"full"}
                                justifyContent={"space-between"}
                                py={4}
                            >
                                <HStack>
                                    <Avatar
                                        size={["2xs", "xs", "xs", "sm"]}
                                        bg={"blackAlpha.800"}
                                    ></Avatar>
                                    <Text
                                        color={"blackAlpha.800"}
                                        fontWeight={"semibold"}
                                        fontFamily={"Baloo 2"}
                                        fontSize={["xs", "xs", "sm"]}
                                    >
                                        {author}
                                    </Text>
                                </HStack>
                                <Text
                                    color={"blackAlpha.700"}
                                    fontSize={["xs", "xs", "sm"]}
                                >
                                    ~ {createdAt ? date : ""}
                                </Text>
                            </HStack>
                        </VStack>
                    </Box>
                    <Box
                        w={["96%", "96%", "96%", "30%"]}
                        mx={["auto", "auto", "auto", 6]}
                        p={6}
                        my={8}
                        borderRadius={"md"}
                        style={{ backgroundColor: "#F7FAFC" }}
                    >
                        <Heading
                            textAlign={"center"}
                            fontSize={["xl", "xl", "2xl", "3xl"]}
                            color={"blackAlpha.600"}
                            fontFamily={"Roboto"}
                        >
                            Other links and info
                        </Heading>
                    </Box>
                </>
            )}
        </Stack>
    );
};

export default DetailedPost;

// const data = [
//     {
//         _id: "64f0254bf5ad5e91c3d4a831",
//         user_id: "64e16fdd2859160d65e7f831",
//         author: "peter parker",
//         title: "What if the title is very big and doesn't fit on the screen haan ? ",
//         description: "<script>alert('hello world');</script",
//         __v: 0,
//     },
//     {
//         _id: "64f0254bf5ad5de91c3d4a831",
//         user_id: "64e16fdd2859160d65e7f831",
//         author: "peter parker",
//         title: "This is a new post ",
//         description:
//             "%3Cp%3E&nbsp;%3C/p%3E%0A%3Cp%3EHello%20I'm%20writing%20this%20post%20to%20check%20whether%20it%20gets%20stored%20in%20db%20or%20not.&nbsp;%3C/p%3E%0A%3Ch1%3ENow%20this%20is%20a%20heading.&nbsp;%3C/h1%3E%0A%3Cp%3E&nbsp;%3C/p%3E",
//         __v: 0,
//     },
//     {
//         _id: "64f0254bf5ad5se91c3d4a831",
//         user_id: "64e16fdd2859160d65e7f831",
//         author: "peter parker",
//         title: "This is a new post ",
//         description:
//             "%3Cp%3E&nbsp;%3C/p%3E%0A%3Cp%3EHello%20I'm%20writing%20this%20post%20to%20check%20whether%20it%20gets%20stored%20in%20db%20or%20not.&nbsp;%3C/p%3E%0A%3Ch1%3ENow%20this%20is%20a%20heading.&nbsp;%3C/h1%3E%0A%3Cp%3E&nbsp;%3C/p%3E",
//         __v: 0,
//     },
//     {
//         _id: "64f0254bf5ad5e91cf3d4a831",
//         user_id: "64e16fdd2859160d65e7f831",
//         author: "peter parker",
//         title: "This is a new post ",
//         description:
//             "%3Cp%3E&nbsp;%3C/p%3E%0A%3Cp%3EHello%20I'm%20writing%20this%20post%20to%20check%20whether%20it%20gets%20stored%20in%20db%20or%20not.&nbsp;%3C/p%3E%0A%3Ch1%3ENow%20this%20is%20a%20heading.&nbsp;%3C/h1%3E%0A%3Cp%3E&nbsp;%3C/p%3E",
//         __v: 0,
//     },
//     {
//         _id: "64f0254bsf5ad5e91c3d4a831",
//         user_id: "64e16fdd2859160d65e7f831",
//         author: "peter parker",
//         title: "This is a new post ",
//         description:
//             "%3Cp%3E&nbsp;%3C/p%3E%0A%3Cp%3EHello%20I'm%20writing%20this%20post%20to%20check%20whether%20it%20gets%20stored%20in%20db%20or%20not.&nbsp;%3C/p%3E%0A%3Ch1%3ENow%20this%20is%20a%20heading.&nbsp;%3C/h1%3E%0A%3Cp%3E&nbsp;%3C/p%3E",
//         __v: 0,
//     },
//     {
//         _id: "64f0254bf5add5e91c3d4a831",
//         user_id: "64e16fdd2859160d65e7f831",
//         author: "peter parker",
//         title: "This is a new post ",
//         description:
//             "%3Cp%3E&nbsp;%3C/p%3E%0A%3Cp%3EHello%20I'm%20writing%20this%20post%20to%20check%20whether%20it%20gets%20stored%20in%20db%20or%20not.&nbsp;%3C/p%3E%0A%3Ch1%3ENow%20this%20is%20a%20heading.&nbsp;%3C/h1%3E%0A%3Cp%3E&nbsp;%3C/p%3E Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vulputate risus vel magna maximus, et tincidunt metus venenatis. Aliquam non ligula neque. In id leo feugiat, rhoncus turpis in, dapibus quam. Sed massa mauris, gravida id consectetur vel, sollicitudin vitae felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vitae neque dapibus, consequat erat sed, tincidunt purus. Etiam vel facilisis justo. Maecenas pellentesque eleifend nunc vel accumsan. Nam placerat pharetra aliquam. Nulla consequat dui ut enim fermentum, eu porta ligula facilisis. Sed non nunc sit amet elit rutrum dictum ac id odio. Donec ultrices nibh sem. Etiam varius efficitur lacus, vitae ornare arcu aliquet aliquet. In iaculis tincidunt orci, a consequat nunc hendrerit eget. Cras convallis turpis ac risus vestibulum, id suscipit ipsum luctus. Aenean tristique purus odio Etiam commodo dui at purus luctus, non pulvinar nibh blandit. Phasellus venenatis in sem non eleifend. Mauris viverra scelerisque consectetur. Aenean molestie libero erat, a malesuada orci aliquam ac. Pellentesque nec justo pellentesque quam egestas dapibus at ut velit. Morbi vulputate nisl nec posuere facilisis. Fusce molestie, purus vitae viverra ornare, eros erat pulvinar nulla, sed malesuada massa ante non magna. Mauris in ipsum nulla. Pellentesque porta eros ac justo feugiat, non aliquam tellus ultrices. Integer a sem finibus, venenatis lectus id, tristique leo. Aenean lectus quam, ultrices eget pharetra non, imperdiet non sem. Quisque rutrum rhoncus tellus ut eleifend. Pellentesque varius erat quam. ",
//         __v: 0,
//     },
//     {
//         _id: "64f025s4bf5ad5e91c3d4a831",
//         user_id: "64e16fdd2859160d65e7f831",
//         author: "peter parker",
//         title: "This is a new post ",
//         description:
//             "%3Cp%3E&nbsp;%3C/p%3E%0A%3Cp%3EHello%20I'm%20writing%20this%20post%20to%20check%20whether%20it%20gets%20stored%20in%20db%20or%20not.&nbsp;%3C/p%3E%0A%3Ch1%3ENow%20this%20is%20a%20heading.&nbsp;%3C/h1%3E%0A%3Cp%3E&nbsp;%3C/p%3E Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vulputate risus vel magna maximus, et tincidunt metus venenatis. Aliquam non ligula neque. In id leo feugiat, rhoncus turpis in, dapibus quam. Sed massa mauris, gravida id consectetur vel, sollicitudin vitae felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vitae neque dapibus, consequat erat sed, tincidunt purus. Etiam vel facilisis justo. Maecenas pellentesque eleifend nunc vel accumsan. Nam placerat pharetra aliquam. Nulla consequat dui ut enim fermentum, eu porta ligula facilisis. Sed non nunc sit amet elit rutrum dictum ac id odio. Donec ultrices nibh sem. Etiam varius efficitur lacus, vitae ornare arcu aliquet aliquet. In iaculis tincidunt orci, a consequat nunc hendrerit eget. Cras convallis turpis ac risus vestibulum, id suscipit ipsum luctus. Aenean tristique purus odio Etiam commodo dui at purus luctus, non pulvinar nibh blandit. Phasellus venenatis in sem non eleifend. Mauris viverra scelerisque consectetur. Aenean molestie libero erat, a malesuada orci aliquam ac. Pellentesque nec justo pellentesque quam egestas dapibus at ut velit. Morbi vulputate nisl nec posuere facilisis. Fusce molestie, purus vitae viverra ornare, eros erat pulvinar nulla, sed malesuada massa ante non magna. Mauris in ipsum nulla. Pellentesque porta eros ac justo feugiat, non aliquam tellus ultrices. Integer a sem finibus, venenatis lectus id, tristique leo. Aenean lectus quam, ultrices eget pharetra non, imperdiet non sem. Quisque rutrum rhoncus tellus ut eleifend. Pellentesque varius erat quam. ",
//         __v: 0,
//     },
//     {
//         _id: "64f0254bf5ad5e91c3d4a8a31",
//         user_id: "64e16fdd2859160d65e7f831",
//         author: "peter parker",
//         title: "This is a new post ",
//         description:
//             "%3Cp%3E&nbsp;%3C/p%3E%0A%3Cp%3EHello%20I'm%20writing%20this%20post%20to%20check%20whether%20it%20gets%20stored%20in%20db%20or%20not.&nbsp;%3C/p%3E%0A%3Ch1%3ENow%20this%20is%20a%20heading.&nbsp;%3C/h1%3E%0A%3Cp%3E&nbsp;%3C/p%3E Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vulputate risus vel magna maximus, et tincidunt metus venenatis. Aliquam non ligula neque. In id leo feugiat, rhoncus turpis in, dapibus quam. Sed massa mauris, gravida id consectetur vel, sollicitudin vitae felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vitae neque dapibus, consequat erat sed, tincidunt purus. Etiam vel facilisis justo. Maecenas pellentesque eleifend nunc vel accumsan. Nam placerat pharetra aliquam. Nulla consequat dui ut enim fermentum, eu porta ligula facilisis. Sed non nunc sit amet elit rutrum dictum ac id odio. Donec ultrices nibh sem. Etiam varius efficitur lacus, vitae ornare arcu aliquet aliquet. In iaculis tincidunt orci, a consequat nunc hendrerit eget. Cras convallis turpis ac risus vestibulum, id suscipit ipsum luctus. Aenean tristique purus odio Etiam commodo dui at purus luctus, non pulvinar nibh blandit. Phasellus venenatis in sem non eleifend. Mauris viverra scelerisque consectetur. Aenean molestie libero erat, a malesuada orci aliquam ac. Pellentesque nec justo pellentesque quam egestas dapibus at ut velit. Morbi vulputate nisl nec posuere facilisis. Fusce molestie, purus vitae viverra ornare, eros erat pulvinar nulla, sed malesuada massa ante non magna. Mauris in ipsum nulla. Pellentesque porta eros ac justo feugiat, non aliquam tellus ultrices. Integer a sem finibus, venenatis lectus id, tristique leo. Aenean lectus quam, ultrices eget pharetra non, imperdiet non sem. Quisque rutrum rhoncus tellus ut eleifend. Pellentesque varius erat quam. ",
//         __v: 0,
//     },
// ];
