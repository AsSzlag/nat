import React from 'react'
import downloadIcon from '../assets/download-icon.svg'
import resumePdf from '../assets/NataliaSzlag_UX_resume.pdf'

const Hero: React.FC = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Hi, I'm Natalia.</h1>
        <div className="hero-subtitle">
          <span>UX/UI Designer</span>
          <div className="hero-dot" aria-hidden="true"></div>
          <span>E-commerce Strategist</span>
        </div>
      </div>
      <div className="hero-cta">
        <div className="hero-line" aria-hidden="true"></div>
        <a 
          href={resumePdf}
          download="NataliaSzlag_UX_resume.pdf"
          className="btn btn-resume"
          aria-label="Download resume PDF"
        >
          Resume
          <img src={downloadIcon} alt="" className="btn-icon-img" aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}

export default Hero
