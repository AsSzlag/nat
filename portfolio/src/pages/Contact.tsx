import React from 'react'
import Layout from '../components/Layout'
import contactImage from '../assets/contact-image.png'
import contactIcon from '../assets/contact-icon.png'

const Contact: React.FC = () => {
  return (
    <Layout>
      <div className="contact-page">
        <div className="contact-container">
          <div className="contact-content-section">
            <div className="contact-info">
              <h1 className="contact-title">Contact.</h1>
              <div className="contact-items">
                <div className="contact-item">
                  <div className="contact-icon">
                    <img src={contactIcon} alt="" className="contact-icon-img" />
                  </div>
                  <a href="mailto:nataliaszlag@gmail.com" className="contact-text">
                    nataliaszlag@gmail.com
                  </a>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">
                    <img src={contactIcon} alt="" className="contact-icon-img" />
                  </div>
                  <a href="tel:+48606354801" className="contact-text">
                    +48 606 354 801
                  </a>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">
                    <img src={contactIcon} alt="" className="contact-icon-img" />
                  </div>
                  <a 
                    href="https://linkedin.com/in/nataliaszlag" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="contact-text"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="contact-image-section">
            <img src={contactImage} alt="" className="contact-image-img" />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Contact
