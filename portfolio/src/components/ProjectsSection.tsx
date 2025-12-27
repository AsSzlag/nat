import React from 'react'
import ProjectCard from './ProjectCard'
import marketplaceMediaExpert from '../assets/marketplace-media-expert.png'
import checkoutSubscription from '../assets/checkout-subscription.png'
import dashboardDelivery from '../assets/dashboard-delivery.png'
import googleAdsDashboard from '../assets/google-ads-dashboard.png'
import freeDeliveryProgram from '../assets/free-delivery-program.png'
import checkoutSubscriptionPdf from '../assets/CheckoutSubsriptionOptimisation.pdf'
import dashboardDeliveryPdf from '../assets/DashboardforDeliveryService.pdf'
import googleAdsDashboardPdf from '../assets/GoogleAdsDashboard.pdf'
import freeDeliveryProgramPdf from '../assets/FreeDeliveryProgram.pdf'

const ProjectsSection: React.FC = () => {
  const projects = [
    {
      title: "Marketplace Media Expert",
      tags: ["#Ecommerce", "#Monetisation", "#Growth"],
      description: "Driven UX Designer with a focus on marketplace and media ecosystems. Led multi-platform initiatives that optimized subscription programs, parcel lockers, and account dashboards, significantly increasing user retention and trust. Proven track record of delivering intuitive product solutions that translate complex user needs into measurable business growth.",
      hasIcon: false,
      buttonText: "View projects",
      image: marketplaceMediaExpert,
      linkTo: "/media-expert"
    },
    {
      title: "Checkout Subscription Optimisation",
      tags: ["#Ecommerce", "#Upselling", "#SubscriptionModel"],
      description: "Optimised the e-commerce subscription funnel by integrating a clear, value-driven purchase option directly within the shopping cart, targeting users at their highest point of intent.",
      hasIcon: true,
      buttonText: "Case study",
      image: checkoutSubscription,
      downloadFile: checkoutSubscriptionPdf,
      downloadFileName: "CheckoutSubsriptionOptimisation.pdf"
    },
    {
      title: "Dashboard for Delivery Service",
      tags: ["#Dashboards", "#B2B", "#Logistics"],
      description: "Designed the end-to-end experience for a B2B order management system. The application streamlines complex logistics workflows, enabling sellers on e-commerce platform to efficiently process orders and coordinate deliveriesfrom an intuitive interface.",
      hasIcon: true,
      buttonText: "Case study",
      image: dashboardDelivery,
      downloadFile: dashboardDeliveryPdf,
      downloadFileName: "DashboardforDeliveryService.pdf"
    },
    {
      title: "Google Ads Management Dashboard & Integration",
      tags: ["#Dashboards", "#InformatonArchitecture"],
      description: "I directed the end-to-end product design for a large scale Google Ads management tool, coordinating across Sales, Legal, IT, and Product teams. My scope encompassed the entire lifecycle, from conducting business interviews and defining information architecture to usability testing and final UI design. The project resulted in a complex dashboard featuring a status panel and over 200+ key elements, delivered through 1000+ working hours of development.",
      hasIcon: true,
      buttonText: "Case study",
      image: googleAdsDashboard,
      downloadFile: googleAdsDashboardPdf,
      downloadFileName: "GoogleAdsDashboard.pdf"
    },
    {
      title: "Free delivery program",
      tags: ["#Ecommerce", "#Dashboards", "#Delivery"],
      description: "I led the end-to-end design of a dual-sided delivery ecosystem, addressing the critical market insight that 88% of users prioritize free shipping. My scope spanned the full product lifecycle, from MVP definition and prototype testing to launching a robust Seller Dashboard capable of handling complex configurations and massive actions.",
      hasIcon: true,
      buttonText: "Case study",
      image: freeDeliveryProgram,
      downloadFile: freeDeliveryProgramPdf,
      downloadFileName: "FreeDeliveryProgram.pdf"
    }
  ]

  return (
    <section id="work" className="projects-section" aria-label="Case Studies">
      <div className="projects-grid">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            tags={project.tags}
            description={project.description}
            hasIcon={project.hasIcon}
            buttonText={project.buttonText}
            image={project.image}
            // customStyle={project.customStyle}
            downloadFile={project.downloadFile}
            downloadFileName={project.downloadFileName}
            linkTo={project.linkTo}
          />
        ))}
      </div>
    </section>
  )
}

export default ProjectsSection
