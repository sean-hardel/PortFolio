import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Lab from '@/components/Lab';
import Stack from '@/components/Stack';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Experience />
        <Projects />
        <Lab />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
