import Layout from "@/src/Component/Layout";
import { store } from "@/src/redux/store";
import { NoSsr } from "@mui/material";
import Head from "next/head";
import { Provider } from "react-redux";
import "../styles/bootstrap.min.css";
import "../styles/Home.module.css";
import "../styles/globals.css";
import "../styles/home.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "@/src/Component/PrivateRoute";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <Head>
        {/* <title>Dot Point Capital</title> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <link href="https://fonts.googleapis.com/css2?family=Jost:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet" />
        {/* <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"></link> */}

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
          crossorigin="anonymous"></script>
        <link
          rel="icon"
          type="image/x-icon"
          href="assets/images/favicon-32x32.png"
        ></link>


        <meta
          name="facebook-domain-verification"
          content="3uj5fa14cncu5q7m7381owbjkjv59l"
        />
      </Head>
      <Provider store={store}>
        <NoSsr>
          <ToastContainer />
          {/* <AppCommonActionsWrapper /> */}
          <PrivateRoute>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </PrivateRoute>
        </NoSsr>
      </Provider>
    </>
  );
}
