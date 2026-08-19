import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import ProductSection from "@/components/ProductSection";
import Configurator from "@/components/Configurator";
import Gallery from "@/components/Gallery";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />

        <Marquee />

        <ProductSection />

        <Configurator />

        <Gallery />

        <ContactForm/>

        <Footer/>
      </main>
    </>
  );
}