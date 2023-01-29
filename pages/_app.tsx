import "@styles/global.css";
import "@styles/nprogress.css";
import Router from "next/router";
import "nprogress/nprogress.css";
import NProgress from "nprogress";
import { AppProps } from "next/app";
import UserProvider from "@context/User";
import Header from "@components/Header";
import AlertProvider from "@context/Alert";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AlertProvider>
      <UserProvider>
        <Header />
        <Component {...pageProps} />
      </UserProvider>
    </AlertProvider>
  );
}
