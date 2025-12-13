import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import CleverCommerce from './pages/CaseStudies/CleverCommerce'
import SellerPage from './pages/CaseStudies/SellerPage'

function HomePage() {
  const [activeSection, setActiveSection] = useState('work')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['work', 'about', 'contact']
      // Adjust offset based on screen size for better mobile detection
      const isMobile = window.innerWidth <= 768
      const offset = isMobile ? 100 : 150
      const scrollPosition = window.scrollY + offset

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    // Initial check
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      const isMobile = window.innerWidth <= 768
      const offset = isMobile ? 70 : 100
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="app">
      <nav className="nav">
        <ul className="nav-list">
          <li>
            <button 
              onClick={() => scrollToSection('work')}
              className={activeSection === 'work' ? 'active' : ''}
            >
              My Work
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('about')}
              className={activeSection === 'about' ? 'active' : ''}
            >
              About Me
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('contact')}
              className={activeSection === 'contact' ? 'active' : ''}
            >
              Contact
            </button>
          </li>
        </ul>
      </nav>

      <main className="main">
        <section id="work" className="section">
          <h1 className="section-title">My Work</h1>
          <div className="content">
            <p>
              <Link to="/clever-commerce" className="work-link">
                Clever Commerce - E-commerce Shopping Cart Prototype
              </Link>
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </section>

        <section id="about" className="section">
          <h1 className="section-title">About Me</h1>
          <div className="content">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </section>

        <section id="contact" className="section">
          <h1 className="section-title">Contact</h1>
          <div className="content">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/clever-commerce" element={<CleverCommerce />} />
        <Route path="/clever-commerce/seller/:sellerId" element={<SellerPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
