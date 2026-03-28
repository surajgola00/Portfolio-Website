import {
  applyImageFallback,
  createSectionPlaceholder,
  withFallbackImage,
} from "../utils/placeholders";

function ProjectCard({ project }) {
  const fallbackImage = createSectionPlaceholder(project.title);

  return (
    <div className="project-card">
      <div className="project-image">
        <img
          src={withFallbackImage(project.imageUrl, fallbackImage)}
          alt={project.title}
          loading="lazy"
          decoding="async"
          onError={(event) => applyImageFallback(event, fallbackImage)}
        />
      </div>
      <div className="project-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="tech-stack">
          {project.techStack.map((tech, idx) => (
            <span key={idx} className="tech-badge">
              {tech}
            </span>
          ))}
        </div>
        <div className="project-links">
          {project.demoLink && project.demoLink !== "#" && (
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              🔗 Demo
            </a>
          )}
          {project.repoLink && project.repoLink !== "#" && (
            <a
              href={project.repoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              📦 Repository
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
