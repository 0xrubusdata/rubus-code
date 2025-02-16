import Head from 'next/head';
import type { AppProps } from "next/app";
import Layout from "@/components/organisms/Layout";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '../styles/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
          <title>Rubus-Code - AI-powered development assistant</title>
          <link rel="icon" href="/icons8-favicon-16.ico" />
          <meta name="description" content="AI-powered development assistant." />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
);
  return <Component {...pageProps} />;
}