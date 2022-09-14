import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "유저 이메일,페스워드 방식",
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "유저 이메일", type: "email", placeholder: "user@email.com" },
                password: { label: "패스워드", type: "password" }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied

                if (
                    // @ts-ignore
                    credentials.email === "testuser@email.com" &&
                    // @ts-ignore
                    credentials.password === "test"
                ) {
                    const user = { id: 1, name: "test user", email: "testuser@email.com" }
                    return user;
                }

                return null
            }
        })
    ],
    secret: process.env.SECRET,
})