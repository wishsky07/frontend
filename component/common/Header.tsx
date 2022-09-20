import Link from "next/link";
import {Button} from "react-bootstrap";
import {useSession, signOut} from "next-auth/react";



function Header() {
    const {data: session, status} = useSession();

    return(
        <header>
            <nav className="navbar navbar-expand-lg bg-dark pt-3 pb-3">
                <div className="container">
                    <span className="navbar-brand">
                        <Link href="/">
                                <a className="text-decoration-none text-white">
                               꾹꾹이
                                </a>
                            </Link>
                    </span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse ms-5" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item me-4">
                                <Link href={'/post/write'}>
                                <a className="nav-link active text-white">글쓰기</a>
                                </Link>
                            </li>
                            <li className="nav-item me-4">
                                <a className="nav-link text-white" href="component/common/Header#">Link</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="component/common/Header#">Disabled</a>
                            </li>
                        </ul>
                        <ul className="navbar-nav justify-content-end">
                            {status === "authenticated" ? (
                            <li className="nav-item me-3">
                                {session && (
                                <span className="text-white fs-5 me-4 position-relative user-session">{session.user?.email}님 로그인중</span>
                                )}
                                <Button variant="light" onClick={() => signOut()}>
                                    로그아웃
                                </Button>
                            </li>
                            ) : (
                                <>
                                <li className="nav-item me-3">
                                    <Link href={'/user/login'}>
                                    <Button variant="light">
                                        로그인
                                    </Button>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link href={'/user/signup'}>
                                <Button variant="light">
                                회원가입
                                </Button>
                                </Link>
                                </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}
export default Header