import '../styles/globals.css'
import type { AppProps } from 'next/app'
import CssBaseline from '@mui/material/CssBaseline';
import Layout from '../components/Layout';
import Provider from '../components/Provider';

function MyApp({Component, pageProps}: AppProps) {
    return (
        <Provider>
            <CssBaseline/>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Provider>
    )
}

export default MyApp
