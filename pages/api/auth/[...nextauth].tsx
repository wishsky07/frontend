import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { verifyPassword } from "../../../lib/auth";

let prisma = new PrismaClient();

export default NextAuth({
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "유저 이메일,패스워드 방식",
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "유저 이메일", type: "email", placeholder: "user@email.com" },
                password: { label: "패스워드", type: "password", placeholder: "비밀번호를 입력하세요" }
            },
            async authorize(credentials, req) {

                const user = await prisma.user.findUnique({
                    where: {
                        // @ts-ignore
                        email: String(credentials.email),
                    },
                    select: {
                        name: true, email: true, password: true, nickname:true
                    },
                });

                if (!user) {
                    throw new Error('No user found!');
                }

                const isValid = await verifyPassword(
                    // @ts-ignore
                    credentials.password,
                    user.password
                );

                if (!isValid) {
                    throw new Error('Could not log you in!');
                }
                return { name: user.name, email: user.email, nickname: user.nickname };
            }
        })
    ],
    pages: {
      signIn: "/Login",
    },
    secret: process.env.SECRET,
})