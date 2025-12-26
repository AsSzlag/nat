import React from 'react'
import Layout from '../components/Layout'
import aboutPortrait from '../assets/about-portrait.png'
import downloadIcon from '../assets/download-icon.svg'
import resumePdf from '../assets/NataliaSzlag_UX_resume.pdf'

const About: React.FC = () => {
  const handleDownloadResume = () => {
    const link = document.createElement('a')
    link.href = resumePdf
    link.download = 'NataliaSzlag_UX_resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Layout>
      <div className="about-page">
        {/* About me. Section */}
        <section className="about-hero-section">
          <div className="about-hero-top">
            <div className="about-hero-content">
              <div className="about-hero-text">
                <h1 className="about-hero-title">About me.</h1>
                <div className="about-hero-text-content">
                  <p>
                    My path to UX wasn't linear, and that is my greatest asset. Before I started crafting interfaces, I was an Economic Analyst for a global bank, working with top-tier clients like Nestlé or Zurich Bank. Today, I use that analytical mindset not just to interpret numbers, but to champion the human behind the screen.
                  </p>
                  <p>
                    As a dedicated user advocate, I ensure that every design decision I make is backed by business logic and deep empathy, creating solutions that drive business growth without compromising user utility.
                  </p>
                </div>
              </div>
              <div className="about-hero-image">
                <img src={aboutPortrait} alt="" className="about-portrait-img" />
              </div>
            </div>
          </div>
          <div className="about-hero-bottom">
            <button 
              className="btn btn-resume"
              onClick={handleDownloadResume}
              type="button"
              aria-label="Download resume PDF"
            >
              Resume
              <img src={downloadIcon} alt="" className="btn-icon-img" aria-hidden="true" />
            </button>
            <p className="about-tagline">I see numbers behind the pixels.</p>
          </div>
        </section>

        {/* What I build? Section */}
        <section className="about-content-section">
          <h2 className="section-title">What I build?</h2>
          <div className="about-content-text">
            <p>
              My experience ranges from transforming a standard online store into a thriving Marketplace (and launching a startup that is now generating significant sales) to designing end-to-end subscription programs.
            </p>
            <p>
              I am also a passionate accessibility enthusiast. For me, WCAG compliance is not just a checklist, but a mindset. I apply this strictly in digital projects, but also in broader Customer Experience (CX) scenarios. A prime example is my work on parcel lockers: I didn't just design the screen interface; I audited and optimized the entire process of receiving a parcel to ensure the physical interaction at the machine was accessible to all users.
            </p>
          </div>
        </section>

        {/* My Strategic Approach & Modern Workflow Section */}
        <section className="about-content-section">
          <h2 className="section-title">My Strategic Approach & Modern Workflow</h2>
          <div className="about-content-text">
            <p>
              I am a firm believer in utility over aesthetics. To achieve the best results efficiently, I embrace AI-augmented workflows, using LLMs and AI-to-Figma tools to speed up prototyping and research. This allows me to focus my energy on what matters most: strategy and problem-solving. I "chunk" processes into MVPs to deliver value ASAP, analyzing corner cases and validating every step with legal departments and development teams.
            </p>
          </div>
        </section>

        {/* Leadership & Collaboration Section */}
        <section className="about-content-section">
          <h2 className="section-title">Leadership & Collaboration</h2>
          <div className="about-content-text">
            <p>
              I don't just design; I partner with the business. I am experienced in preparing briefs and presenting to C-level executives, where I negotiate solutions and advocate for the user. I also believe in the power of Omnichannel, bridging the gap between offline retail and online experiences. Within the team, I act as a mentor to junior designers and often step up to support Project Managers in keeping delivery on track.
            </p>
          </div>
        </section>

        {/* Divider */}
        <div className="about-divider"></div>

        {/* Beyond the Screen Section */}
        <section className="about-beyond-section">
          <h2 className="section-title">Beyond the Screen</h2>
          <div className="about-beyond-content">
            <div className="about-beyond-text">
              <p>
                Global Perspective & Life Offline Living in 6 different European countries (including Austria, Italy, France, and Germany) has taught me adaptability and opened my eyes to how different cultures interact with technology. I draw inspiration from everywhere—sometimes the best eCommerce solution comes from observing a video game interface or a real-world interaction.
              </p>
              <p>
                Off-duty, I thrive on routine and nature. You'll find me starting my day with a dog walk in the park or spending my weekends glued to Formula 1 (I love the suspense of the race and the thrill of seeing a bold strategy pay off). I also have the soul of a pastry chef—in my free time, I test new recipes, always looking for ways to sweeten life for others, both literally and through better design.
              </p>
            </div>
            <div className="about-beyond-quote">
              <div className="about-quote-content">
                <p className="about-quote-line1">Life begins at the end</p>
                <p className="about-quote-line2">of your comfort zone.</p>
              </div>
              <p className="about-quote-author">Neale Donald Walsch</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default About
