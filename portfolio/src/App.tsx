import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Hero from './components/Hero'
import ProjectsSection from './components/ProjectsSection'
import About from './pages/About'
import Contact from './pages/Contact'
import MediaExpert from './pages/MediaExpert'
import CleverCommerce from './pages/CaseStudies/CleverCommerce'
import SellerPage from './pages/CaseStudies/SellerPage'

function HomePage() {
  return (
    <Layout>
      <Hero />
      <ProjectsSection />
    </Layout>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/case-studies" element={<Navigate to="/" replace />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/media-expert" element={<MediaExpert />} />
        <Route path="/clever-commerce" element={<CleverCommerce />} />
        <Route path="/clever-commerce/seller/:sellerId" element={<SellerPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
