import type { Project } from "../types/project";
import { ProjectCard } from "./ProjectCard";

interface Props {
  projects: Project[];
  onOpen: (project: Project, trigger: HTMLButtonElement) => void;
}

export function ProjectsGrid({ projects, onOpen }: Props) {
  return (
    <section className="projects-section section-shell" id="projects" aria-labelledby="projects-title">
      <header className="section-header" data-reveal>
        <div>
          <p className="section-kicker">Selected work</p>
          <h2 id="projects-title">Проекты</h2>
        </div>
        <p className="section-intro">IT-продукты, собранные мной с самого начала до финального результата.</p>
      </header>

      {projects.length > 0 ? (
        <div className="projects-grid">
          {projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} onOpen={onOpen} />)}
        </div>
      ) : (
        <div className="empty-projects" data-reveal>
          <h3>Проекты готовятся к публикации</h3>
          <p>Новая работа появится здесь после добавления папки с <code>project.json</code> и следующей сборки.</p>
        </div>
      )}
    </section>
  );
}
