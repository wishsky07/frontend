
import {PropsWithChildren} from "react";
import TopHead from "../common/TopHead";
import Header from "../common/Header";
import Footer from "../common/Footer";


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