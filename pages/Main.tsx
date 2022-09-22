import {Container} from "react-bootstrap";
import {useSession} from "next-auth/react";
import DarkMode from "../component/darkmode/DarkMode";



function Main() {
    const {data: session, status} = useSession();
    return (
        <Container>
            {status === "authenticated" ? (
            <h1 className="text-center mt-4">welcome</h1>
                ) : (
                <h1 className="text-center mt-4">꾹꾹이입니다. 로그인하세요</h1>
                )}
            <DarkMode />
        </Container>
    )
}
export default Main