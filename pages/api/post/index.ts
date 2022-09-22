import { getSession } from "next-auth/react"
import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client";



export default async function handle(req: NextApiRequest, res: NextApiResponse) {

    let prisma = new PrismaClient();

    const { title, content } = req.body;

    const session = await getSession({ req });


    const result = await prisma.post.create({
        data: {
            title: title,
            content: content,

            author: { connect:
                // @ts-ignore
                    { email: session?.user?.email }
            },
        },
    });

    if (result) {
        res.status(201).json({ message: '글쓰기가 완료되었습니다', error: false });

    } else {
        res.status(422).json({ message: 'Prisma 오류', error: true })
    }

}