import React from 'react'

interface ProjectCardProps {
  title: string
  tags: string[]
  description: string
  hasIcon?: boolean
  buttonText: string
  image: string
  imageClass?: string
  customStyle?: React.CSSProperties
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  tags,
  description,
  hasIcon = false,
  buttonText,
  image,
  imageClass = '',
  customStyle
}) => {
  return (
    <div className="project-card">
      <div className="project-content">
        <div className="project-header">
          <h2 className="project-title">{title}</h2>
          <div className="project-tags">
            {tags.map((tag, index) => (
              <span key={index} className="project-tag">{tag}</span>
            ))}
          </div>
        </div>
        <p className="project-description">{description}</p>
        <div className="project-actions">
          <button 
            className="btn btn-primary"
            type="button"
            aria-label={`${buttonText} - ${title}`}
          >
            {buttonText}
            {hasIcon && <div className="btn-icon" aria-hidden="true"></div>}
          </button>
        </div>
      </div>
      <div className={`project-image ${imageClass}`} style={customStyle}>
        <img src={image} alt="" className="project-image-img" />
      </div>
    </div>
  )
}

export default ProjectCard
