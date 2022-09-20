import React, {useCallback, useState} from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import {Col, Container, Row} from "react-bootstrap";
import {Button, TextField} from "@mui/material";
import Layout from "../../component/common/Layout";





function Login() {

    const [formStatus, setFormStatus] = useState<string | null>(null);

    const [email, setEmail] = useState<string>('');

    const onEmailChange = useCallback((_text: string) => {
        setEmail(_text.trim());
    }, []);

    const [password, setPassword] = useState<string>('');

    const onPasswordChange = useCallback((_text: string) => {
        setPassword(_text.trim());
    }, []);


    async function submitHandler(event: React.SyntheticEvent) {
        event.preventDefault();

        const result = await signIn("credentials", {
            redirect: false,
            email: email,
            password: password,
        });



        // @ts-ignore
        if (!result.error) {
            setFormStatus(`로그인 성공`);
            router.replace("/");
        } else {
            // @ts-ignore
            setFormStatus(`에러가 발생하였습니다 : ${result.error}`);
        }
    } // end of submitHandler function


    const { data: session, status } = useSession();

    const router = useRouter();



    if (status === "authenticated") {
        router.replace("/");
    }

    return(
        <Layout>
            <Container>
                <h1 className="fs-1 fw-bold text-center">로그인</h1>
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
                                로그인
                            </Button>
                        </div>
                    </div>
                    <Row className="mt-5 row-cols-auto justify-content-center">
                        <Col className="text-center">
                            <Button variant="contained" className="w-100 p-2 fs-5 naver-button">
                                네이버 로그인
                            </Button>
                        </Col>
                        <Col className="text-center">
                            <Button variant="contained" className="w-100 p-2 fs-5 kakao-button" onClick={() => signIn('kakao')}>
                                카카오 로그인
                            </Button>
                        </Col>
                        <Col className="text-center">
                            <Button variant="contained" className="w-100 p-2 fs-5 google-button">
                                구글 로그인
                            </Button>
                        </Col>
                    </Row>
                </form>
            </Container>
        </Layout>
    )
}
export default Login