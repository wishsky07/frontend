import type { AppProps } from 'next/app'
import "bootstrap/dist/css/bootstrap.min.css";
import "/styles/style.css";
import {SessionProvider} from "next-auth/react";


function MyApp({ Component, pageProps } : AppProps) {
    return (
        <SessionProvider>
                <Component {...pageProps} />
        </SessionProvider>
    );
}

export default MyApp;
