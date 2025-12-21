import React from 'react'
import Header from './Header'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="app">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="main" tabIndex={-1}>
        {children}
      </main>
    </div>
  )
}

export default Layout
