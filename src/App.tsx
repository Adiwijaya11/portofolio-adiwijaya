import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import SoftwareStack from './components/SoftwareStack'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import SmartChatWidget from './components/SmartChatWidget'
import ScrollRevealProvider from './components/ScrollRevealProvider'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 font-sans selection:bg-amber-200 selection:text-amber-900">
      <CustomCursor />
      {/* ScrollRevealProvider: aktifkan scroll animation di seluruh halaman */}
      <ScrollRevealProvider />
      <Navbar />

      <main className="flex-grow">
        <Hero />
        <About />
        <Projects />
        <SoftwareStack />
      </main>

      <Footer />
      <SmartChatWidget />
    </div>
  )
}

export default App