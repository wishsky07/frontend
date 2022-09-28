import React from "react";
import { GetServerSideProps } from "next";
import Post, { PostProps } from "../../component/Post/Post";
import { useSession, getSession } from "next-auth/react";
import {Container} from "react-bootstrap";
import Layout from "../../component/common/Layout";
import {ListItem} from "@mui/material";
import {prisma} from "../../lib/prisma"




 export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const session = await getSession({ req });
    if (!session) {
        res.statusCode = 403;
        return { props: { drafts: [] } };
    }

    const drafts = await prisma.post.findMany({
        where: {
            author: { email: session.user.email },
            published: false,
        },
        include: {
            author: {
                select: { name: true, email: true },
            },
        },
    });

    return {
        props: {
            drafts : JSON.parse(JSON.stringify(drafts))
        },
    };
};

type DraftProps = {
    drafts: PostProps[];
};


function Drafts({drafts} : DraftProps) {

    const {data: session, status } = useSession();

    if (!session) {
        return (
            <Layout>
                <Container>
                    <h1 className="text-center fw-bold">게시물 리스트</h1>
                    <p className="text-center fs-5">게시물 리스트를 보시려면 로그인이 필요합니다.</p>
                </Container>
            </Layout>
        );
    }



    return (

        {props:drafts.map((post) => (
                <ListItem key={post.id}>
                    <Post post={post} />
                </ListItem>
            ))}
)

};

export default Drafts;