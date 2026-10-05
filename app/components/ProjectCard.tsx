import { useRef, type CSSProperties, type MouseEvent } from "react";
import type { Project } from "../types/project";
import { ProjectMedia } from "./ProjectMedia";

interface Props {
  project: Project;
  index: number;
  onOpen: (project: Project, trigger: HTMLButtonElement) => void;
}

export function ProjectCard({ project, index, onOpen }: Props) {
  const cardRef = useRef<HTMLElement>(null);

  const handleMove = (event: MouseEvent<HTMLElement>) => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    event.currentTarget.style.setProperty("--tilt-x", `${y * -3}deg`);
    event.currentTarget.style.setProperty("--tilt-y", `${x * 4}deg`);
    event.currentTarget.style.setProperty("--spot-x", `${(x + 0.5) * 100}%`);
    event.currentTarget.style.setProperty("--spot-y", `${(y + 0.5) * 100}%`);
  };
  const reset = () => {
    cardRef.current?.style.setProperty("--tilt-x", "0deg");
    cardRef.current?.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <article
      ref={cardRef}
      className={`project-card ${project.featured ? "project-card--featured" : ""}`}
      style={{ "--project-color": project.color } as CSSProperties}
      data-reveal
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      <button className="project-card__hit" type="button" onClick={(event) => onOpen(project, event.currentTarget)} aria-label={`Открыть проект «${project.title}»`} />
      <div className="project-card__visual">
        <ProjectMedia src={project.cover} alt={`Обложка проекта «${project.title}»`} title={project.title} color={project.color} eager={index === 0} />
        <span className="project-card__view" aria-hidden="true">Смотреть ↗</span>
        {project.featured && <span className="project-card__featured">Избранный проект</span>}
      </div>
      <div className="project-card__body">
        <div className="project-card__topline">
          <span className="project-card__number">{String(index + 1).padStart(2, "0")}</span>
          <span>{project.year}</span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-card__categories" aria-label="Категории">
          {project.categories.map((category) => <span key={category}>{category}</span>)}
        </div>
      </div>
    </article>
  );
}

