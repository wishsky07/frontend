import {useState} from "react";
import {Router} from "next/router";
import {Button, Col, Container, Row} from "react-bootstrap";
import {TextareaAutosize, TextField} from "@mui/material";
import Layout from "../../component/common/Layout";
import dynamic from "next/dynamic";
import { useRouter } from 'next/router'
import {useSession} from "next-auth/react";

const ToastEditor = dynamic(
    () => import('../../component/Editor/ToastEditor'),
    {ssr:false},
)

 function Write() {
     const router = useRouter();
     const { data: session, status } = useSession();
    const [title, setTitle] = useState("");
     const [content, setContent] = useState("");

    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            const body = { title, content };
            await fetch("/api/post", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });


            await router.push("/post/drafts");

        } catch (error) {
            console.error(error);
        }
    };





     return(
        <Layout>
            <Container>
                <h1 className="text-center mt-4">글쓰기</h1>
                <form onSubmit={submitData}>
                    <TextField
                        variant="outlined"
                        id="title"
                        className="w-100 mt-4 title-input mb-5"
                        label="제목"
                        placeholder="제목을 입력하세요"
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <TextareaAutosize
                        className="w-100 resize-textarea"
                        id="content"
                        onChange={(e) => setContent(e.target.value)}
                    />

                    <Row className="row-cols-auto justify-content-end mt-4">
                        <Col>
                            <Button type="submit" className="w-100 bg-success shadow-none">저장하기</Button>
                        </Col>
                        <Col>
                            <Button className="w-100 bg-light shadow-none text-dark border-0" onClick={() => {router.back();}}>취소하기</Button>
                        </Col>
                    </Row>

                </form>
            </Container>
        </Layout>
    )
}

export default Write

