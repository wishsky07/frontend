import React, { useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Layout from "../component/Layout";
import {Container} from "react-bootstrap";

import {Button, TextField} from "@mui/material";
import {string} from "prop-types";


async function createUser(
    name: string,
    email: string,
    password: string
): Promise<any> {
    const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong!");
    }

    return data;
}




const Signup: React.FC = (props) => {

    // @ts-ignore
    const [formStatus, setFormStatus] = useState<string>(null);

    const nameInputRef = useRef<HTMLInputElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);

    const { status } = useSession();
    const router = useRouter();

    async function submitHandler(event: React.SyntheticEvent) {
        event.preventDefault();

        const enteredName = nameInputRef.current?.value;
        const enteredEmail = emailInputRef.current?.value;
        const enteredPassword = passwordInputRef.current?.value;

        // optional: Add validation

        try {
            const result = await createUser(
                // @ts-ignore
                enteredName,
                enteredEmail,
                enteredPassword
            );
            console.log(result);
            setFormStatus(`Sign up Success: ${result.message}`);
             //window.location.href = "/";
             //await router.replace("/login");
        } catch (error) {
            console.log(error);
            // @ts-ignore
            setFormStatus(`Error Occured: ${error.message}`);
        }


    if (status === "authenticated") {
       // await router.replace("/");
        return (
            <Layout>
                <h1>환영합니다.</h1>
                <p>로그인 되었습니다 메인페이지로 이동합니다.</p>
            </Layout>
        );
    }
}// end of submitHandler function
    return (
        <Layout>
            <Container>
                <h1 className="text-center mt-5 fw-bold">회원가입</h1>
                <form onSubmit={submitHandler}>
                    <div className="input-box me-auto ms-auto w-50 pt-4">
                        <TextField
                            id="email"
                            label="이메일"
                            variant="filled"
                            placeholder="이메일을 입력하세요"
                            className="w-100 mb-4"
                            type="email"
                            required
                            ref={nameInputRef}
                        />
                        <TextField
                            id="name"
                            label="이름"
                            variant="filled"
                            placeholder="이름을 입력하세요"
                            className="w-100 mb-4"
                            type="text"
                            required
                            ref={emailInputRef}
                        />
                        <TextField
                            id="password"
                            label="비밀번호"
                            variant="filled"
                            placeholder="비밀번호를 입력하세요"
                            className="w-100 mb-5"
                            type="password"
                            required
                            ref={passwordInputRef}
                        />
                        <p className="text-center fs-5 fw-bold text-danger">
                            {formStatus}
                        </p>
                        <div className="submit-div text-center mt-5">
                            <Button variant="contained" type="submit" className="w-100 p-2 fs-5">
                                회원가입
                            </Button>
                        </div>
                    </div>
                </form>
            </Container>
        </Layout>
    )
}
export default Signup