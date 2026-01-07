import { Header } from '@/components/Header'
import { Hero3D } from '@/components/Hero3D'
import { Footer } from '@/components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main role="main">
        <Hero3D />
      </main>
      <Footer />
    </div>
  )
}

export default App