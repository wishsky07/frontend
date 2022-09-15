import React, {useState, useRef, useCallback} from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Layout from "../component/Layout";
import {Container} from "react-bootstrap";

import {Button, TextField} from "@mui/material";


async function createUser(
    name: string,
    email: string,
    password: string
): Promise<any> {

    const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ name: name, email:email, password:password}),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "문제가 발생하였습니다");
    }

    return data;
}



function Signup() {

    const [formStatus, setFormStatus] = useState<string | null>(null);
    const [email, setEmail] = useState<string>('');

    const onEmailChange = useCallback((_text: string) => {
        setEmail(_text.trim());
    }, []);

    const [name, setName] = useState<string>('');

    const onNameChange = useCallback((_text: string) => {
        setName(_text.trim());
    }, []);

    const [password, setPassword] = useState<string>('');

    const onPasswordChange = useCallback((_text: string) => {
        setPassword(_text.trim());
    }, []);



    const { status } = useSession();
    const router = useRouter();

    async function submitHandler(event: React.SyntheticEvent) {
        event.preventDefault();



        try {
            const result = await createUser(name,email,password)
            console.log(result);
            setFormStatus(`회원가입 성공: ${result.message}`);
            //window.location.href = "/";
            await router.replace("/api/auth/signin");
        } catch (error) {
            console.log(error);
            // @ts-ignore
            setFormStatus(`에러입니다: ${error.message}`);
        }
    }

    if (status === "authenticated") {
        router.replace("/");
        return (
            <div>
                <h1>Sign Up</h1>
                <div>You are already signed up.</div>
                <div>Now redirect to main page.</div>
            </div>
        );
    }
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
                            value={email}
                            onChange={(e) => onEmailChange(e.currentTarget.value)}
                            required
                        />
                        <TextField
                            id="name"
                            label="이름"
                            variant="filled"
                            placeholder="이름을 입력하세요"
                            className="w-100 mb-4"
                            type="text"
                            required
                            value={name}
                            onChange={(e) => onNameChange(e.currentTarget.value)}
                        />
                        <TextField
                            id="password"
                            label="비밀번호"
                            variant="filled"
                            placeholder="비밀번호를 입력하세요"
                            className="w-100 mb-5"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => onPasswordChange(e.currentTarget.value)}
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