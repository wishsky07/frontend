import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../../../lib/auth';

async function Loginhandler(req: NextApiRequest, res: NextApiResponse) {

    let prisma = new PrismaClient();

    if (req.method !== 'POST') {
        return;
    }

    const data = req.body;

    const {email, password } = data;


    const existingLogin = await prisma.user.findUnique({
            where: {
                email: email,
            },
            select: {
                email: true
            }
        }
    );

    if (existingLogin) {
        res.status(422).json({ message: '로그인이 실패하였습니다', error: true });
        return;
    }

    const hashedPassword = await hashPassword(password);

    const result = await prisma.user.updateMany({
        data: {
            email: email,
            password: hashedPassword,
        },
    });

    if (result) {
        res.status(201).json({ message: '로그인이 성공하였습니다!', error: false });
    } else {
        res.status(422).json({ message: 'Prisma 오류', error: true })
    }
}

export default Loginhandler;