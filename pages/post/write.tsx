import {useState} from "react";
import {Router} from "next/router";
import {Container} from "react-bootstrap";
import {TextField} from "@mui/material";
import Layout from "../../component/common/Layout";
import dynamic from "next/dynamic";

const ToastEditor = dynamic(
    () => import('../../component/Editor/ToastEditor'),
    {ssr:false},
)

 function Write() {


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
            // @ts-ignore
            await Router.push("/drafts");
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
                    />
                    <ToastEditor />
                </form>
            </Container>
        </Layout>
    )
}

export default Write

// @ts-ignore