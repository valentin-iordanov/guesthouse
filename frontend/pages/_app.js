// Component: Custom App
import '@/styles/globals.css'
import { Playfair_Display, Open_Sans } from 'next/font/google'
import Head from 'next/head'

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', weight: ['400','700'] })
const openSans = Open_Sans({ subsets: ['latin'], variable: '--font-open-sans', weight: ['400','700'] })

export default function App({ Component, pageProps }) {
  return (
    <div className={`${playfair.variable} ${openSans.variable}`}>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </Head>
      <Component {...pageProps} />
    </div>
  )
}
