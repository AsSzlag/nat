import React from 'react'
import Layout from '../components/Layout'
import aboutPortrait from '../assets/about-portrait.png'
import downloadIcon from '../assets/download-icon.svg'
import resumePdf from '../assets/NataliaSzlag_UX_resume.pdf'

const About: React.FC = () => {
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
                  I am a Senior UX/UI Designer who builds products that work for both the user and the business. With over 7 years of experience, I turn complex business requirements into intuitive, high-converting e-commerce experiences. My path covers the full spectrum of product growth. I helped build the Erli marketplace from a startup into one of the top platforms in Poland today. I optimised the Media Expert ecosystem to drive usability, stability and maximum conversion.
                  </p>
                  <p>
                  My professional maturity is rooted in the corporate business world. Working as Reporting Specialist for multinational companies like UBS, Capgemini and Capita gave me a distinct analytical mindset. This background allows me to deeply analyse data and prepare solutions that don't just look good, but bring real numbers. Furthermore, it taught me how to navigate large projects and effectively cooperate with teams all over the world.
                  </p>
                  <p>
                  I thrive in dynamic, cross-functional environments, collaborating closely with developers, project managers, and other designers. From this strong team foundation, I frequently step into the role of Lead Designer, taking ownership of projects and making critical decisions. I am comfortable presenting at the C-level, regularly discussing strategy and validating designs with CEOs to ensure total business alignment. 
                  </p>
                  <p>
                  I bridge the gap between User-Centered Design and business logic, utilising AI tools and usability testing to ensure every design decision is data-driven. I am hands-on throughout the entire lifecycle, from leading discovery workshops for Media Expert sellers to testing after deployment and continuously optimising the product. I also prioritise inclusivity, ensuring every interface meets strict WCAG standards. I design with empathy, but I validate with business logic.
                  </p>
                </div>
              </div>
              <div className="about-hero-image">
                <img src={aboutPortrait} alt="Natalia Szlag, UX Designer and E-commerce Strategist" className="about-portrait-img" />
              </div>
            </div>
          </div>
          <div className="about-hero-bottom">
            <a
              href={resumePdf}
              download="NataliaSzlag_UX_resume.pdf"
              className="btn btn-resume"
              aria-label="Download resume PDF"
            >
              Resume
              <img src={downloadIcon} alt="" className="btn-icon-img" aria-hidden="true" />
            </a>
            <p className="about-tagline">I see numbers behind the pixels.</p>
          </div>
        </section>

        {/* What I build? Section */}
        <section className="about-content-section" aria-labelledby="what-i-build-title">
          <h2 id="what-i-build-title" className="section-title">What I build?</h2>
          <div className="about-content-text">
            <p>
            I specialise in building scalable e-commerce solutions that cater to the entire ecosystem, both B2C buyers and B2B sellers. My experience covers the full lifecycle of platform growth. I have transformed an online store into a profitable Marketplace (Media Expert). I also built as a Lead Designer a marketplace startup from scratch that is now generating significant sales (Erli). Additionally, I have been responsible for creating and optimising subscription programs.
            </p>
            <p>
            I combine this business focus with a strict adherence to accessibility. For me, WCAG is not just a checklist, but a mindset. This is best illustrated by my work on parcel lockers, where I optimized the total Customer Experience (CX). I audited both the screen interface and the physical hardware interaction, ensuring that receiving a parcel is a seamless process for every user.
            </p>
          </div>
        </section>

        {/* My Strategic Approach & Modern Workflow Section */}
        <section className="about-content-section" aria-labelledby="strategic-approach-title">
          <h2 id="strategic-approach-title" className="section-title">My Strategic Approach</h2>
          <div className="about-content-text">
            <p>
            I am a firm believer in utility over aesthetics. I approach every project with a highly organised mindset. Before I open a design tool, I translate complex requirements into clear process maps and block diagrams. This visual logic allows me to 'chunk' processes into MVPs and analyse corner cases early. My solutions are grounded in data, synthesizing both quantitative insights from analytical teams and qualitative user feedback. I also embrace innovation by using AI tools as a powerful assistant to accelerate the Proof of Concept (PoC) phase, allowing me to iterate quicker and deliver tangible results faster. 
            </p>
          </div>
        </section>

        {/* Leadership & Collaboration Section */}
        <section className="about-content-section" aria-labelledby="leadership-title">
          <h2 id="leadership-title" className="section-title">Leadership & Collaboration</h2>
          <div className="about-content-text">
            <p>
              I don't just design, I partner with the business. I am experienced in preparing briefs and presenting to C-level executives, where I negotiate solutions and advocate for the user. I also believe in the power of Omnichannel, bridging the gap between offline retail and online experiences. Within the team, I act as a mentor to junior designers and often step up to support Project Managers in keeping delivery on track.
            </p>
          </div>
        </section>

        {/* Divider */}
        <div className="about-divider"></div>

        {/* Beyond the Screen Section */}
        <section className="about-beyond-section" aria-labelledby="beyond-screen-title">
          <h2 id="beyond-screen-title" className="section-title">Beyond the Screen</h2>
          <div className="about-beyond-content">
            <div className="about-beyond-text">
              <p>
                Living in several different European countries (including Austria, Italy, France, and Germany) has taught me adaptability and opened my eyes to how different cultures interact with technology. I draw inspiration from everywhere, sometimes the best e-commerce solution comes from observing a video game interface or a real-world interaction.
              </p>
              <p>
              Off-duty, I am a nature enthusiast. You will find me starting my day with a dog walk or clocking thousands of steps exploring the city.I am also a huge Formula 1 fan, I love the suspense of the race and the thrill of seeing a bold strategy pay off. I have the soul of a pastry chef, I love the deep focus it requires and the fact that, much like in analytics, you need exact numbers and precise proportions to obtain a perfect result.
              </p>
            </div>
            <blockquote className="about-beyond-quote">
              <div className="about-quote-content">
                <p className="about-quote-line1">Life begins at the end</p>
                <p className="about-quote-line2">of your comfort zone.</p>
              </div>
              <cite className="about-quote-author">— Neale Donald Walsch</cite>
            </blockquote>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default About
