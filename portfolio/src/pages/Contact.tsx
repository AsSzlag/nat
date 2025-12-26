import React from 'react'
import Layout from '../components/Layout'
import contactImage from '../assets/contact-image.png'

const Contact: React.FC = () => {
  return (
    <Layout>
      <div className="contact-page">
        <div className="contact-container">
          <div className="contact-content-section">
            <div className="contact-info">
              <h1 className="contact-title">Contact.</h1>
              <div className="contact-items">
                <a href="mailto:nataliaszlag@gmail.com" className="contact-item">
                  <div className="contact-icon">
                    <i className="fa-regular fa-envelope" aria-hidden="true"></i>
                  </div>
                  <span className="contact-text">
                    nataliaszlag@gmail.com
                  </span>
                </a>
                <a href="tel:+48606354801" className="contact-item">
                  <div className="contact-icon">
                    <i className="fa-solid fa-mobile-screen-button" aria-hidden="true"></i>
                  </div>
                  <span className="contact-text">
                    +48 606 354 801
                  </span>
                </a>
                <a 
                  href="https://www.linkedin.com/in/natalia-szlag-3515891b8/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="contact-item"
                  aria-label="LinkedIn profile (opens in new tab)"
                >
                  <div className="contact-icon">
                    <i className="fa-brands fa-linkedin-in" aria-hidden="true"></i>
                  </div>
                  <span className="contact-text">
                    LinkedIn
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div className="contact-image-section">
            <img src={contactImage} alt="Contact illustration" className="contact-image-img" aria-hidden="true" />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Contact
