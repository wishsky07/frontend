import React from "react";
import { GetServerSideProps } from "next";
import Post, { PostProps } from "../../component/Post/Post";
import { useSession, getSession } from "next-auth/react";
import {PrismaClient} from "@prisma/client";
import {Container} from "react-bootstrap";


let prisma = new PrismaClient();

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
        props: { drafts },
    };
};

type Props = {
    drafts: PostProps[];
};

// @ts-ignore
const Drafts: React.FC<Props> = (props) => {
    // @ts-ignore
    const [session] = useSession();

    if (!session) {
        return (
                <Container>
                    <h1 className="text-center fw-bold">미발행 Post 모음</h1>
                    <p className="text-center fs-5">미발행 Post를 보시려면 로그인이 필요합니다.</p>
                </Container>
        );
    }


    return (
                                                  // @ts-ignore
            <Post post="asd" />
)

};

export default Drafts;