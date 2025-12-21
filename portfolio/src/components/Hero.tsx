import React from 'react'
import downloadIcon from '../assets/download-icon.svg'
import resumePdf from '../assets/NataliaSzlag_UX_resume.pdf'

const Hero: React.FC = () => {
  const handleDownloadResume = () => {
    const link = document.createElement('a')
    link.href = resumePdf
    link.download = 'NataliaSzlag_UX_resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Hi, I'm Natalia.</h1>
        <div className="hero-subtitle">
          <span>UX/UI Designer</span>
          <div className="hero-dot"></div>
          <span>E-commerce Strategist</span>
        </div>
      </div>
      <div className="hero-cta">
        <div className="hero-line"></div>
        <button 
          className="btn btn-hero" 
          onClick={handleDownloadResume}
          type="button"
          aria-label="Download resume PDF"
        >
          Resume
          <img src={downloadIcon} alt="" className="btn-icon-img" aria-hidden="true" />
        </button>
      </div>
    </section>
  )
}

export default Hero
