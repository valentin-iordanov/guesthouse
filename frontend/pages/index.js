// Page: Home
import Header from '@/src/app/components/Header'
import Hero from '@/src/app/components/Hero'
import About from '@/src/app/components/About'
import Gallery from '@/src/app/components/Gallery'
import Location from '@/src/app/components/Location'
import Reviews from '@/src/app/components/Reviews'
import Contact from '@/src/app/components/Contact'
import Footer from '@/src/app/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Gallery />
      <Location />
      <Reviews />
      <Contact />
      <Footer />
    </>
  )
}
