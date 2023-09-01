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
import React from "react";
import { useParams } from "react-router-dom";
import RenderHtmlComponent from "./RenderHtmlComponent";

const DetailedPost = () => {
    const { id } = useParams();
    const toast = useToast();
    const post =
        data.filter((e) => {
            return id === e._id;
        }) || null;

    if (!post) {
        toast({
            title: "Something went wrong while loading the post 😔",
            status: "error",
            position: "top",
            isClosable: true,
        });
    }

    let { title, description, author } = post[0];
    description = decodeURI(description);

    return (
        <Box
            maxW={[
                "container.sm",
                "container.sm",
                "container.md",
                "container.lg",
                "container.xl",
            ]}
            mt={24}
            mx={"auto"}
            p={6}
            border={"3px solid gray"}
            bgColor={"#f7f7f7"}
            borderRadius={"md"}
        >
            <VStack w={"full"} alignItems={"flex-start"}>
                <Heading
                    fontFamily={"Roboto"}
                    textAlign={"center"}
                    w={"full"}
                    py={3}
                >
                    {title}
                </Heading>
                <Divider></Divider>
                <RenderHtmlComponent
                    htmlContent={description}
                ></RenderHtmlComponent>
                <Divider py={4}></Divider>
                <HStack w={"full"} justifyContent={"space-between"} py={4}>
                    <HStack>
                        <Avatar size={"sm"}></Avatar>
                        <Text
                            color={"blackAlpha.700"}
                            fontSize={"md"}
                            fontFamily={"Baloo 2"}
                        >
                            {author}
                        </Text>
                    </HStack>
                    <Text color={"blackAlpha.700"}>20/08/2024</Text>
                </HStack>
            </VStack>
        </Box>
    );
};

export default DetailedPost;

const data = [
    {
        _id: "64f0254bf5ad5e91c3d4a831",
        user_id: "64e16fdd2859160d65e7f831",
        author: "peter parker",
        title: "What if the title is very big and doesn't fit on the screen haan ? ",
        description: "<script>alert('hello world');</script",
        __v: 0,
    },
    {
        _id: "64f0254bf5ad5de91c3d4a831",
        user_id: "64e16fdd2859160d65e7f831",
        author: "peter parker",
        title: "This is a new post ",
        description:
            "%3Cp%3E&nbsp;%3C/p%3E%0A%3Cp%3EHello%20I'm%20writing%20this%20post%20to%20check%20whether%20it%20gets%20stored%20in%20db%20or%20not.&nbsp;%3C/p%3E%0A%3Ch1%3ENow%20this%20is%20a%20heading.&nbsp;%3C/h1%3E%0A%3Cp%3E&nbsp;%3C/p%3E",
        __v: 0,
    },
    {
        _id: "64f0254bf5ad5se91c3d4a831",
        user_id: "64e16fdd2859160d65e7f831",
        author: "peter parker",
        title: "This is a new post ",
        description:
            "%3Cp%3E&nbsp;%3C/p%3E%0A%3Cp%3EHello%20I'm%20writing%20this%20post%20to%20check%20whether%20it%20gets%20stored%20in%20db%20or%20not.&nbsp;%3C/p%3E%0A%3Ch1%3ENow%20this%20is%20a%20heading.&nbsp;%3C/h1%3E%0A%3Cp%3E&nbsp;%3C/p%3E",
        __v: 0,
    },
    {
        _id: "64f0254bf5ad5e91cf3d4a831",
        user_id: "64e16fdd2859160d65e7f831",
        author: "peter parker",
        title: "This is a new post ",
        description:
            "%3Cp%3E&nbsp;%3C/p%3E%0A%3Cp%3EHello%20I'm%20writing%20this%20post%20to%20check%20whether%20it%20gets%20stored%20in%20db%20or%20not.&nbsp;%3C/p%3E%0A%3Ch1%3ENow%20this%20is%20a%20heading.&nbsp;%3C/h1%3E%0A%3Cp%3E&nbsp;%3C/p%3E",
        __v: 0,
    },
    {
        _id: "64f0254bsf5ad5e91c3d4a831",
        user_id: "64e16fdd2859160d65e7f831",
        author: "peter parker",
        title: "This is a new post ",
        description:
            "%3Cp%3E&nbsp;%3C/p%3E%0A%3Cp%3EHello%20I'm%20writing%20this%20post%20to%20check%20whether%20it%20gets%20stored%20in%20db%20or%20not.&nbsp;%3C/p%3E%0A%3Ch1%3ENow%20this%20is%20a%20heading.&nbsp;%3C/h1%3E%0A%3Cp%3E&nbsp;%3C/p%3E",
        __v: 0,
    },
    {
        _id: "64f0254bf5add5e91c3d4a831",
        user_id: "64e16fdd2859160d65e7f831",
        author: "peter parker",
        title: "This is a new post ",
        description:
            "%3Cp%3E&nbsp;%3C/p%3E%0A%3Cp%3EHello%20I'm%20writing%20this%20post%20to%20check%20whether%20it%20gets%20stored%20in%20db%20or%20not.&nbsp;%3C/p%3E%0A%3Ch1%3ENow%20this%20is%20a%20heading.&nbsp;%3C/h1%3E%0A%3Cp%3E&nbsp;%3C/p%3E Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vulputate risus vel magna maximus, et tincidunt metus venenatis. Aliquam non ligula neque. In id leo feugiat, rhoncus turpis in, dapibus quam. Sed massa mauris, gravida id consectetur vel, sollicitudin vitae felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vitae neque dapibus, consequat erat sed, tincidunt purus. Etiam vel facilisis justo. Maecenas pellentesque eleifend nunc vel accumsan. Nam placerat pharetra aliquam. Nulla consequat dui ut enim fermentum, eu porta ligula facilisis. Sed non nunc sit amet elit rutrum dictum ac id odio. Donec ultrices nibh sem. Etiam varius efficitur lacus, vitae ornare arcu aliquet aliquet. In iaculis tincidunt orci, a consequat nunc hendrerit eget. Cras convallis turpis ac risus vestibulum, id suscipit ipsum luctus. Aenean tristique purus odio Etiam commodo dui at purus luctus, non pulvinar nibh blandit. Phasellus venenatis in sem non eleifend. Mauris viverra scelerisque consectetur. Aenean molestie libero erat, a malesuada orci aliquam ac. Pellentesque nec justo pellentesque quam egestas dapibus at ut velit. Morbi vulputate nisl nec posuere facilisis. Fusce molestie, purus vitae viverra ornare, eros erat pulvinar nulla, sed malesuada massa ante non magna. Mauris in ipsum nulla. Pellentesque porta eros ac justo feugiat, non aliquam tellus ultrices. Integer a sem finibus, venenatis lectus id, tristique leo. Aenean lectus quam, ultrices eget pharetra non, imperdiet non sem. Quisque rutrum rhoncus tellus ut eleifend. Pellentesque varius erat quam. ",
        __v: 0,
    },
    {
        _id: "64f025s4bf5ad5e91c3d4a831",
        user_id: "64e16fdd2859160d65e7f831",
        author: "peter parker",
        title: "This is a new post ",
        description:
            "%3Cp%3E&nbsp;%3C/p%3E%0A%3Cp%3EHello%20I'm%20writing%20this%20post%20to%20check%20whether%20it%20gets%20stored%20in%20db%20or%20not.&nbsp;%3C/p%3E%0A%3Ch1%3ENow%20this%20is%20a%20heading.&nbsp;%3C/h1%3E%0A%3Cp%3E&nbsp;%3C/p%3E Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vulputate risus vel magna maximus, et tincidunt metus venenatis. Aliquam non ligula neque. In id leo feugiat, rhoncus turpis in, dapibus quam. Sed massa mauris, gravida id consectetur vel, sollicitudin vitae felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vitae neque dapibus, consequat erat sed, tincidunt purus. Etiam vel facilisis justo. Maecenas pellentesque eleifend nunc vel accumsan. Nam placerat pharetra aliquam. Nulla consequat dui ut enim fermentum, eu porta ligula facilisis. Sed non nunc sit amet elit rutrum dictum ac id odio. Donec ultrices nibh sem. Etiam varius efficitur lacus, vitae ornare arcu aliquet aliquet. In iaculis tincidunt orci, a consequat nunc hendrerit eget. Cras convallis turpis ac risus vestibulum, id suscipit ipsum luctus. Aenean tristique purus odio Etiam commodo dui at purus luctus, non pulvinar nibh blandit. Phasellus venenatis in sem non eleifend. Mauris viverra scelerisque consectetur. Aenean molestie libero erat, a malesuada orci aliquam ac. Pellentesque nec justo pellentesque quam egestas dapibus at ut velit. Morbi vulputate nisl nec posuere facilisis. Fusce molestie, purus vitae viverra ornare, eros erat pulvinar nulla, sed malesuada massa ante non magna. Mauris in ipsum nulla. Pellentesque porta eros ac justo feugiat, non aliquam tellus ultrices. Integer a sem finibus, venenatis lectus id, tristique leo. Aenean lectus quam, ultrices eget pharetra non, imperdiet non sem. Quisque rutrum rhoncus tellus ut eleifend. Pellentesque varius erat quam. ",
        __v: 0,
    },
    {
        _id: "64f0254bf5ad5e91c3d4a8a31",
        user_id: "64e16fdd2859160d65e7f831",
        author: "peter parker",
        title: "This is a new post ",
        description:
            "%3Cp%3E&nbsp;%3C/p%3E%0A%3Cp%3EHello%20I'm%20writing%20this%20post%20to%20check%20whether%20it%20gets%20stored%20in%20db%20or%20not.&nbsp;%3C/p%3E%0A%3Ch1%3ENow%20this%20is%20a%20heading.&nbsp;%3C/h1%3E%0A%3Cp%3E&nbsp;%3C/p%3E Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vulputate risus vel magna maximus, et tincidunt metus venenatis. Aliquam non ligula neque. In id leo feugiat, rhoncus turpis in, dapibus quam. Sed massa mauris, gravida id consectetur vel, sollicitudin vitae felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vitae neque dapibus, consequat erat sed, tincidunt purus. Etiam vel facilisis justo. Maecenas pellentesque eleifend nunc vel accumsan. Nam placerat pharetra aliquam. Nulla consequat dui ut enim fermentum, eu porta ligula facilisis. Sed non nunc sit amet elit rutrum dictum ac id odio. Donec ultrices nibh sem. Etiam varius efficitur lacus, vitae ornare arcu aliquet aliquet. In iaculis tincidunt orci, a consequat nunc hendrerit eget. Cras convallis turpis ac risus vestibulum, id suscipit ipsum luctus. Aenean tristique purus odio Etiam commodo dui at purus luctus, non pulvinar nibh blandit. Phasellus venenatis in sem non eleifend. Mauris viverra scelerisque consectetur. Aenean molestie libero erat, a malesuada orci aliquam ac. Pellentesque nec justo pellentesque quam egestas dapibus at ut velit. Morbi vulputate nisl nec posuere facilisis. Fusce molestie, purus vitae viverra ornare, eros erat pulvinar nulla, sed malesuada massa ante non magna. Mauris in ipsum nulla. Pellentesque porta eros ac justo feugiat, non aliquam tellus ultrices. Integer a sem finibus, venenatis lectus id, tristique leo. Aenean lectus quam, ultrices eget pharetra non, imperdiet non sem. Quisque rutrum rhoncus tellus ut eleifend. Pellentesque varius erat quam. ",
        __v: 0,
    },
];
