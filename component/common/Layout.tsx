import {PropsWithChildren} from "react";
import TopHead from "../common/TopHead";
import Header from "../common/Header";
import Footer from "../common/Footer";
import styles from "../../styles/Layout.module.css"


function Layout({children} : PropsWithChildren) {
    return(
        <div className={styles.Wrap}>
            <TopHead />
            <Header />
            <div className={styles.ContainerWp}>
            {children}
            </div>
            <Footer />

        </div>
    )
}
export default Layout