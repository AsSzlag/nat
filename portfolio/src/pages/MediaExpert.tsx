import React from 'react'
import Layout from '../components/Layout'
import mediaExpertImage from '../assets/MediaExpertApp.png'
import meBoxImage from '../assets/MEBox.png'
import Reordering from '../assets/Reordering.gif'
import ProductReview from '../assets/ProductReview.gif'

const MediaExpert: React.FC = () => {
  return (
    <Layout>
      <div className="media-expert-page">
        {/* Hero Section */}
        <div className="media-expert-hero">
          <div className="media-expert-hero-content">
            <div className="media-expert-hero-text">
              <h1 className="media-expert-title">Media Expert</h1>
              <p className="media-expert-intro">
                Media Expert is the undisputed leader in the consumer electronics and home appliances market in Poland and one of the largest e-commerce platforms in Central and Eastern Europe. Operating under the TERG S.A. group, the company has transformed from a traditional retail chain into a Marketplace Platform.
              </p>
              <div className="media-expert-kpi-section">
                <h2 className="media-expert-kpi-title">Key Performance Indicators (2024–2025)</h2>
                <ul className="media-expert-kpi-list">
                  <li>Ranked as the #2 or #3 e-commerce platform in Poland (competing directly with global giants like Allegro and Amazon).</li>
                  <li>Serves nearly 12 million real users every month, representing nearly one-third of the Polish population.</li>
                  <li>Reported record-breaking annual revenues of $5.98 Billion (PLN 21.5 billion) for the 2024/2025 fiscal year.</li>
                  <li>Achieved an EBITDA exceeding $278 Million (PLN 1 billion), with net profits climbing to over $195 Million (PLN 700 million).</li>
                  <li>Supports its digital ecosystem with a network of over 600 stores and a massive $139 Million (PLN 500 million) state of the art logistics hub.</li>
                <li>The app exceeds a million downloads on Google Play alone.</li>
                  <li>The mobile app maintains a 4.9/5 rating on the App Store (based on 20,000+ reviews).</li>
                </ul>
              </div>
              <p className="media-expert-nda">NDA Protected</p>
            </div>
            <div className="media-expert-hero-image">
              <img src={mediaExpertImage} alt="Media Expert mobile app interface showing the App Store listing and various app screens" className="media-expert-img" />
            </div>
          </div>
        </div>

        {/* Section 1: Easy reordering */}
        <div className="media-expert-section" role="region" aria-labelledby="easy-reordering-title">
          <div className="media-expert-section-content">
            <div className="media-expert-section-header">
              <div className="media-expert-section-text">
                <div className="media-expert-section-title-group">
                  <h2 id="easy-reordering-title" className="media-expert-section-title">Easy reordering & boosting FMCG retention</h2>
                  <div className="media-expert-tags">
                    <span>#Ecommerce</span>
                    <span>#Retention</span>
                    <span>#Reorder</span>
                  </div>
                </div>
                <p className="media-expert-description">
                  To capture the growing supermarket market, we needed to transform a one-time shopping trip into a recurring habit. The goal was to increase FMCG sales and user retention by removing the friction of manual search for routine purchases, while simultaneously driving new account registrations.
                </p>
                <div className="media-expert-role">
                  <h3 className="media-expert-role-title">My Role</h3>
                  <p className="media-expert-role-text">
                    As the lead designer, I spearheaded a cross-functional, phased rollout for both App and Web. My focus was on balancing immediate business value (ASAP delivery) with a robust, scalable user experience.
                  </p>
                </div>
              </div>
              <div className="media-expert-section-image">
                <img src={Reordering} alt="Animation showing the easy reordering feature in the Media Expert app" className="media-expert-img" />
              </div>
            </div>
            <div className="media-expert-highlights">
              <div className="media-expert-highlight-item">
                <h3 className="media-expert-highlight-title">Smart "Buy Again" Ecosystem</h3>
                <p className="media-expert-highlight-text">
                  Designed contextual entry points in order history and a high-conversion Side-Drawer that allows users to bulk-add regulars with real-time price validation.
                </p>
              </div>
              <div className="media-expert-highlight-item">
                <h3 className="media-expert-highlight-title">Edge Case Mastery</h3>
                <p className="media-expert-highlight-text">
                  Defined complex logic for product unavailability, ensuring the user flow remained "unblocked" even when stock was low.
                </p>
              </div>
              <div className="media-expert-highlight-item">
                <h3 className="media-expert-highlight-title">Data-Driven Iteration</h3>
                <p className="media-expert-highlight-text">
                  Beyond the UI, I defined the KPI framework, monitoring conversion lifts and behavioral shifts to refine the experience post-launch.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Product review */}
        <div className="media-expert-section" role="region" aria-labelledby="product-review-title">
          <div className="media-expert-section-content">
            <div className="media-expert-section-header">
              <div className="media-expert-section-text">
                <div className="media-expert-section-title-group">
                  <h2 id="product-review-title" className="media-expert-section-title">Improving product review process</h2>
                  <div className="media-expert-tags">
                    <span>#Ecommerce</span>
                    <span>#ProductReview</span>
                    <span>#UserEngagement</span>
                  </div>
                </div>
                <p className="media-expert-description">
                  User-generated content, like reviews, is one of the most powerful drivers of conversion on product pages. However, the existing process for leaving feedback was fragmented and high-friction. The goal was to drastically increase the volume of reviews by simplifying the submission flow on both Web and App, ultimately boosting trust and sales for future customers.
                </p>
                <div className="media-expert-role">
                  <h3 className="media-expert-role-title">My Role</h3>
                  <p className="media-expert-role-text">
                    I led the end-to-end design of a centralized review system. My approach focused on reducing cognitive load and ensuring long-term scalability while navigating complex legal requirements.
                  </p>
                </div>
              </div>
              <div className="media-expert-section-image">
                <img src={ProductReview} alt="Product review process interface" className="media-expert-img" />
              </div>
            </div>
            <div className="media-expert-highlights-grid">
              <div>
                <div className="media-expert-highlight-item">
                  <h3 className="media-expert-highlight-title">Frictionless Multi-Rating</h3>
                  <p className="media-expert-highlight-text">
                    Instead of forcing users to rate items one-by-one, I designed a contextual side-drawer that allows users to select multiple products from a single order and complete reviews in one streamlined flow.
                  </p>
                </div>
                <div className="media-expert-highlight-item">
                  <h3 className="media-expert-highlight-title">Legal & Compliance Leadership</h3>
                  <p className="media-expert-highlight-text">
                    Acted as the design lead in consultations with Legal teams to ensure the flow complied with transparency regulations (e.g., Omnibus Directive), ensuring that only verified purchasers could leave reviews.
                  </p>
                </div>
              </div>
              <div>
                <div className="media-expert-highlight-item">
                  <h3 className="media-expert-highlight-title">System Integrity & Logic</h3>
                  <p className="media-expert-highlight-text">
                    Developed the logic for "already rated" states to prevent double-submissions, ensuring a clean database and a clear UI state for the user.
                  </p>
                </div>
                <div className="media-expert-highlight-item">
                  <h3 className="media-expert-highlight-title">Post-Purchase Loop</h3>
                  <p className="media-expert-highlight-text">
                    Created a dedicated "My Reviews" tab within the customer account, transforming a one-time action into a permanent part of the user's shopping history.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: ME Box */}
        <div className="media-expert-section" role="region" aria-labelledby="me-box-title">
          <div className="media-expert-mebox-content">
            <div className="media-expert-mebox-header">
              <div className="media-expert-mebox-text">
                <div className="media-expert-mebox-title-group">
                  <h2 id="me-box-title" className="media-expert-mebox-title">ME Box - launching a Parcel Locker Ecosystem</h2>
                  <div className="media-expert-tags">
                    <span>#Omnichannel</span>
                    <span>#ParcelLocker</span>
                    <span>#ProductDesign</span>
                  </div>
                </div>
                <p className="media-expert-description">
                  In a fast-paced retail market, consumer behavior has shifted toward total autonomy. Customers no longer want to be restricted by store opening hours or wait in checkout lines to collect a package; they demand the speed and flexibility of 24/7 self-service pickup. Simultaneously, the rapid growth of e-commerce was putting an unsustainable operational strain on store staff. The ME Box project was conceived to meet this market demand—providing a high-speed, "on-your-own-terms" pickup experience while significantly offloading manual tasks from store clerks to an automated system.
                </p>
                <div className="media-expert-role">
                  <h3 className="media-expert-role-title">My Role</h3>
                  <p className="media-expert-role-text">
                    I led the end-to-end product strategy, acting as the bridge between business goals, marketing identity, and technical implementation.
                  </p>
                </div>
              </div>
              <div className="media-expert-mebox-image">
                <img src={meBoxImage} alt="ME Box parcel locker system" className="media-expert-img" />
              </div>
            </div>
            <div className="media-expert-mebox-highlights">
              <div className="media-expert-mebox-highlights-row">
                <div className="media-expert-highlight-item">
                  <h3 className="media-expert-highlight-title">Service Design & UX Audit</h3>
                  <p className="media-expert-highlight-text">
                    I didn't just design the app, I conducted a full CX Audit of the physical pickup process. This included mapping the user journey from the digital notification to the physical interaction at the locker, ensuring the flow was intuitive in real-world conditions.
                  </p>
                </div>
                <div className="media-expert-highlight-item">
                  <h3 className="media-expert-highlight-title">Business Analysis & Benchmarking</h3>
                  <p className="media-expert-highlight-text">
                    Performed a deep-dive SWOT analysis and competitive benchmarking to identify gaps in existing locker services. This allowed us to build a "best-in-class" solution that offered unique advantages.
                  </p>
                </div>
              </div>
              <div className="media-expert-mebox-highlights-row">
                <div className="media-expert-highlight-item">
                  <h3 className="media-expert-highlight-title">Omnichannel Brand Integration</h3>
                  <p className="media-expert-highlight-text">
                    I supported the marketing department in defining the "ME Box" identity, including naming, logo design, and visual ID, ensuring the digital interface and the physical locker were perfectly aligned.
                  </p>
                </div>
                <div className="media-expert-highlight-item">
                  <h3 className="media-expert-highlight-title">Complex Process Mapping</h3>
                  <p className="media-expert-highlight-text">
                    Beyond the "happy path," I designed the logic for failed pickups and returns, defining what happens when a parcel remains uncollected, which was critical for store operations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default MediaExpert
