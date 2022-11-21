import { AppProps } from "next/app";
import NProgress from "nprogress";
import Router from "next/router";
import "nprogress/nprogress.css";
import "@styles/global.css";
import "@styles/nprogress.css";
import UserProvider from "@context/User";
import Header from "@components/Header";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Header />
      <Component {...pageProps} />
    </UserProvider>
  );
}
