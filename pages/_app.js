import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import Header from './components/Header'
import Footer from './components/Footer'
import { Poppins } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';


const inter = Poppins({
  subsets: ['latin'],
  weight: '400'
});



export default function App({
  Component, pageProps: { session, ...pageProps }
}) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Dashboard</title>
      </Head>
      <main className={`${inter.className}`}>
        <Header />
        <div className="min-h-screen max-w-screen-2xl mx-auto">
          <Component {...pageProps} />
          <Toaster position='top-center'  />
        </div>
        <Footer />
      </main>
    </SessionProvider>
  )
}
