import React from 'react'
import { Link } from 'react-router-dom'
import downloadIcon from '../assets/download-icon.svg'

interface ProjectCardProps {
  title: string
  tags: string[]
  description: string
  hasIcon?: boolean
  buttonText: string
  image: string
  imageClass?: string
  customStyle?: React.CSSProperties
  downloadFile?: string
  downloadFileName?: string
  linkTo?: string
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  tags,
  description,
  hasIcon = false,
  buttonText,
  image,
  imageClass = '',
  customStyle,
  downloadFile,
  downloadFileName,
  linkTo
}) => {
  const handleButtonClick = () => {
    if (downloadFile) {
      const link = document.createElement('a')
      link.href = downloadFile
      link.download = downloadFileName || downloadFile.split('/').pop() || 'download.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const buttonContent = (
    <>
      {buttonText}
      {hasIcon && <img src={downloadIcon} alt="" className="btn-icon-img" aria-hidden="true" />}
    </>
  )

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
          {linkTo ? (
            <Link 
              to={linkTo}
              className="btn btn-primary"
              aria-label={`${buttonText} - ${title}`}
            >
              {buttonContent}
            </Link>
          ) : (
            <button 
              className="btn btn-primary"
              type="button"
              onClick={handleButtonClick}
              aria-label={`${buttonText} - ${title}`}
            >
              {buttonContent}
            </button>
          )}
        </div>
      </div>
      <div className={`project-image ${imageClass}`} style={customStyle}>
        <img src={image} alt="" className="project-image-img" />
      </div>
    </div>
  )
}

export default ProjectCard
