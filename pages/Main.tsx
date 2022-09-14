import {Container} from "react-bootstrap";
import {useSession} from "next-auth/react";

function Main() {
    const {data: session, status} = useSession();
    return (
        <Container>
            {status === "authenticated" ? (
            <h1 className="text-center mt-4">welcome</h1>
                ) : (
                <h1 className="text-center mt-4">login here</h1>
                )}
        </Container>
    )
}
export default Main