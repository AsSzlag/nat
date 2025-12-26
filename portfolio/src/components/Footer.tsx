import React from 'react'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-content">
        <p className="footer-text">
          © {currentYear} Natalia Szlag. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer

