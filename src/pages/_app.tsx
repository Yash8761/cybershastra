// src/pages/_app.tsx
import { useRouter } from "next/router";
import Layout from "@/components/layout/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const authPages = ["/docs/getting-started","/auth/login", "/auth/register", "/auth/forgot-password", "/about-us", "/privacy-policy", "/terms-of-service", "/refund-policy"];

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isAuthPage = authPages.includes(router.pathname);

  if (isAuthPage) {
    return (
      <>
        <Component {...pageProps} />
        <ToastContainer position="top-right" autoClose={3000} />
      </>
    );
  }

  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer position="top-right" autoClose={3000} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
