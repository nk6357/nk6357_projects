import { useMemo, useState } from "react";
import type { Project } from "../types/project";
import { ProjectCard } from "./ProjectCard";

interface Props {
  projects: Project[];
  onOpen: (project: Project, trigger: HTMLButtonElement) => void;
}

export function ProjectsGrid({ projects, onOpen }: Props) {
  const [activeCategory, setActiveCategory] = useState("Все");
  const categories = useMemo(() => ["Все", ...Array.from(new Set(projects.flatMap((project) => project.categories))).sort((a, b) => a.localeCompare(b, "ru"))], [projects]);
  const visible = activeCategory === "Все" ? projects : projects.filter((project) => project.categories.includes(activeCategory));

  return (
    <section className="projects-section section-shell" id="projects" aria-labelledby="projects-title">
      <header className="section-header" data-reveal>
        <div>
          <p className="section-kicker"><span>01</span> Selected work</p>
          <h2 id="projects-title">Проекты</h2>
        </div>
        <p className="section-intro">Продукты, интерфейсы и системы — спроектированные и собранные как единое целое.</p>
      </header>

      {projects.length > 0 ? (
        <>
          <div className="filters" aria-label="Фильтр проектов" data-reveal>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                aria-pressed={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category}<sup>{category === "Все" ? projects.length : projects.filter((project) => project.categories.includes(category)).length}</sup>
              </button>
            ))}
          </div>
          <div className="projects-grid" aria-live="polite">
            {visible.map((project) => <ProjectCard key={project.slug} project={project} index={projects.indexOf(project)} onOpen={onOpen} />)}
          </div>
        </>
      ) : (
        <div className="empty-projects" data-reveal>
          <span aria-hidden="true">00</span>
          <h3>Проекты готовятся к публикации</h3>
          <p>Новая работа появится здесь после добавления папки с <code>project.json</code> и следующей сборки.</p>
        </div>
      )}
    </section>
  );
}
