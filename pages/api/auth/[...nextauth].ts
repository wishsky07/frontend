import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import KakaoProvider from "next-auth/providers/kakao";
import { verifyPassword } from "../../../lib/auth";
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import {prisma} from "../../../lib/prisma"








export default NextAuth({

    adapter: PrismaAdapter(prisma),

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
                        email: String(credentials!.email),
                    },
                    select: {
                        name: true, email: true, password: true, nickname:true
                    },
                });

                if (!user) {
                    throw new Error('No user found!');
                }


                const isValid = await verifyPassword(

                    credentials!.password,
                    // @ts-ignore
                    user.password
                );

                if (!isValid) {
                    throw new Error('Could not log you in!');
                }
                return { name: user.name, email: user.email, nickname: user.nickname };
            }
        }),
        KakaoProvider({
            clientId: process.env.KAKAO_CLIENT_ID!,
            clientSecret: process.env.KAKAO_CLIENT_SECRET!
        })
    ],

    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
    },
    jwt: {
        secret: "secret",
    },
    callbacks: {
        async jwt({ token, user, account}) {
            if (user) {
                token.role = user.role;
            }
            if(account) {
                token.role = account.role;
            }
            return token;
        },
        async session({ session, token }) {
            session.role = token.role;
            return session;
        },
    },
    pages: {
        signIn: "/user/login",
    },
    secret: process.env.SECRET,

})