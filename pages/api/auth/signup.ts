import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../../../lib/auth';

async function handler(req: NextApiRequest, res: NextApiResponse) {

    let prisma = new PrismaClient();

    if (req.method !== 'POST') {
        return;
    }

    const data = req.body;

    const { name, nickname, email, password } = data;

    if (
        !name ||
        !nickname ||
        !email ||
        !email.includes('@') ||
        !password ||
        password.trim().length < 7
    ) {
        res.status(422).json({
            message:
                '패스워드는 7자 이상으로 해주세요',
            error: true,
        });
        return;
    }

    const existingUser = await prisma.user.findUnique({
            where: {
                email: email,
            },
            select: {
                email: true, name: true, nickname: true,
            }
        }
    );

    if (existingUser) {
        res.status(422).json({ message: '가입이 되어 있는 이메일이거나 중복된 이메일입니다', error: true });
        return;
    }

    const hashedPassword = await hashPassword(password);

    const result = await prisma.user.createMany({
        data: {
            name: name,
            nickname: nickname,
            email: email,
            password: hashedPassword,

        },


    });


    if (result) {
        res.status(201).json({ message: '계정등록이 완료되었습니다', error: false });

    } else {
        res.status(422).json({ message: 'Prisma 오류', error: true })
    }
}

export default handler;