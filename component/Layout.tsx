import TopHead from "./TopHead";
import Header from "./Header";
import Footer from "./Footer";
import {PropsWithChildren} from "react";

function Layout({children} : PropsWithChildren) {
    return(
        <div className="wrap">
            <TopHead />
            <Header />
            <div className="section-wrap">
            {children}
            </div>
            <Footer />

        </div>
    )
}
export default Layout