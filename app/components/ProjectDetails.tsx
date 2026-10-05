import { useRef } from "react";
import { useDialog } from "../hooks/useDialog";
import type { Project } from "../types/project";
import { ButtonLink } from "./ButtonLink";
import { ProjectMedia } from "./ProjectMedia";

interface Props {
  project: Project;
  nextProject?: Project;
  onClose: () => void;
  onNext: (project: Project) => void;
  returnFocusRef: React.RefObject<HTMLElement | null>;
}

export function ProjectDetails({ project, nextProject, onClose, onNext, returnFocusRef }: Props) {
  const panelRef = useRef<HTMLElement>(null);
  useDialog(panelRef, onClose, returnFocusRef);

  return (
    <div className="project-dialog" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <article
        className="project-detail"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-detail-title"
        tabIndex={-1}
      >
        <header className="project-detail__bar">
          <a href="#top" className="logo" tabIndex={-1} aria-hidden="true"><span>nk</span>6357</a>
          <span>Project file</span>
          <button className="project-detail__close" type="button" onClick={onClose} data-autofocus>
            Закрыть <span aria-hidden="true">×</span>
          </button>
        </header>

        <div className="project-detail__hero">
          <h2 id="project-detail-title">{project.title}</h2>
          <p>{project.description}</p>
        </div>

        <ProjectMedia className="project-detail__cover" src={project.preview ?? project.cover} alt={`Превью проекта «${project.title}»`} title={project.title} color={project.color} eager />

        <div className="project-detail__content">
          <div className="project-detail__label">О проекте</div>
          <div className="project-detail__text">
            <p>{project.longDescription ?? project.description}</p>
            {project.technologies.length > 0 && (
              <div className="project-detail__stack">
                <h3>Технологии</h3>
                <ul>{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
              </div>
            )}
            {(project.website || project.github) && (
              <div className="project-detail__actions">
                {project.website && <ButtonLink href={project.website} target="_blank" rel="noreferrer noopener">Открыть проект</ButtonLink>}
                {project.github && <ButtonLink href={project.github} target="_blank" rel="noreferrer noopener" variant="outline">Исходный код</ButtonLink>}
              </div>
            )}
          </div>
        </div>

        {project.gallery.length > 0 && (
          <div className="project-detail__gallery" aria-label="Галерея проекта">
            {project.gallery.map((image, index) => (
              <ProjectMedia key={image} src={image} alt={`${project.title}: изображение ${index + 1}`} title={project.title} color={project.color} />
            ))}
          </div>
        )}

        {nextProject && (
          <button className="next-project" type="button" onClick={() => onNext(nextProject)}>
            <span>Следующий проект</span>
            <strong>{nextProject.title}</strong>
          </button>
        )}
      </article>
    </div>
  );
}
