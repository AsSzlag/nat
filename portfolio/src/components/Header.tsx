import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/logo.svg'

const Header: React.FC = () => {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const isActive = (path: string) => {
    return location.pathname === path
  }

  const handleCaseStudiesClick = (e: React.MouseEvent) => {
    // If we're on the home page, scroll to projects section instead of navigating
    if (location.pathname === '/') {
      e.preventDefault()
      setIsMobileMenuOpen(false)
      const projectsSection = document.getElementById('work')
      if (projectsSection) {
        const isMobile = window.innerWidth <= 768
        const offset = isMobile ? 70 : 100
        const elementPosition = projectsSection.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - offset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    } else {
      setIsMobileMenuOpen(false)
    }
  }

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    const handleTab = (e: KeyboardEvent) => {
      if (!isMobileMenuOpen) return

      const menu = document.getElementById('mobile-menu')
      if (!menu) return

      const focusableElements = menu.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault()
        lastElement.focus()
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault()
        firstElement.focus()
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape)
      document.addEventListener('keydown', handleTab)
      // Focus management: move focus to close button when menu opens
      setTimeout(() => {
        const closeButton = document.querySelector('.mobile-menu-close') as HTMLElement
        if (closeButton) {
          closeButton.focus()
        }
      }, 100)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('keydown', handleTab)
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    // Return focus to hamburger button when menu closes
    if (!isMobileMenuOpen) {
      const hamburgerButton = document.querySelector('.hamburger-menu-btn') as HTMLElement
      if (hamburgerButton && document.activeElement === document.body) {
        hamburgerButton.focus()
      }
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <nav className="nav" role="banner">
        <div className="nav-content">
          <Link to="/" className="logo-link">
            <img src={logo} alt="" className="logo" />
          </Link>
          <ul className="nav-list">
            <li>
              <Link
                to="/case-studies"
                className={isActive('/') ? 'active' : ''}
                onClick={handleCaseStudiesClick}
              >
                Case studies
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={isActive('/about') ? 'active' : ''}
              >
                About me
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={isActive('/contact') ? 'active' : ''}
              >
                Contact
              </Link>
            </li>
          </ul>
          <button 
            className="hamburger-menu-btn"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            type="button"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </nav>
      {isMobileMenuOpen && (
        <div 
          className="mobile-menu-overlay" 
          onClick={toggleMobileMenu}
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-menu-title"
        >
          <div 
            className="mobile-menu" 
            id="mobile-menu"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile-menu-header">
              <span className="mobile-menu-title" id="mobile-menu-title">Menu</span>
              <button 
                className="mobile-menu-close"
                onClick={toggleMobileMenu}
                aria-label="Close menu"
                type="button"
              >
                ×
              </button>
            </div>
            <ul className="mobile-nav-list">
              <li>
                <Link
                  to="/case-studies"
                  className={isActive('/') ? 'active' : ''}
                  onClick={(e) => {
                    handleCaseStudiesClick(e)
                    handleLinkClick()
                  }}
                >
                  Case studies
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={isActive('/about') ? 'active' : ''}
                  onClick={handleLinkClick}
                >
                  About me
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={isActive('/contact') ? 'active' : ''}
                  onClick={handleLinkClick}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  )
}

export default Header