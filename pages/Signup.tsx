import React, { useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Layout from "../component/Layout";
import {Container} from "react-bootstrap";
function Signup() {
    return (
        <Layout>
            <Container>
                <h1 className="text-center">회원가입</h1>
            </Container>
        </Layout>
    )
}
export default Signup