import {useSession} from "next-auth/react";
import DarkMode from "../darkmode/DarkMode";



{/* 쓰일 것 같거나, 필요없는 코드, 실험적으로 쓰이는 코드들 모아놓는 곳  */}

function Trash() {

    const {data: session, status} = useSession();

    return(
        <>
        {status === "authenticated" ? (
            <h1 className="text-center mt-4">welcome</h1>
        ) : (
            <h1 className="text-center mt-4">꾹꾹이입니다. 로그인하세요</h1>
        )}
            <DarkMode />
        </>
    )
}

export default Trash