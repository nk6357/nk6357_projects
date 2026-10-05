import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { projects as generatedProjects } from "./generated/projects";
import type { Project } from "./types/project";
import { useReveal } from "./hooks/useReveal";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { CookieBanner } from "./components/CookieBanner";
import { CustomCursor } from "./components/CustomCursor";
import { Footer, type LegalDocument } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { LegalModal } from "./components/LegalModal";
import { Marquee } from "./components/Marquee";
import { ProjectDetails } from "./components/ProjectDetails";
import { ProjectsGrid } from "./components/ProjectsGrid";
import { ScrollProgress } from "./components/ScrollProgress";
import { Skills } from "./components/Skills";

function projectFromHash(projects: Project[]) {
  const match = window.location.hash.match(/^#project\/(.+)$/);
  if (!match) return null;
  const slug = decodeURIComponent(match[1]);
  return projects.find((project) => project.slug === slug) ?? null;
}

export function Portfolio() {
  const projects = useMemo(() => generatedProjects.filter((project) => !project.hidden), []);
  const [activeProject, setActiveProject] = useState<Project | null>(() => projectFromHash(projects));
  const [legal, setLegal] = useState<LegalDocument | null>(null);
  const projectTriggerRef = useRef<HTMLElement | null>(null);
  const legalTriggerRef = useRef<HTMLElement | null>(null);
  useReveal();

  useEffect(() => {
    const syncHash = () => setActiveProject(projectFromHash(projects));
    window.addEventListener("hashchange", syncHash);
    window.addEventListener("popstate", syncHash);
    return () => {
      window.removeEventListener("hashchange", syncHash);
      window.removeEventListener("popstate", syncHash);
    };
  }, [projects]);

  const openProject = useCallback((project: Project, trigger: HTMLButtonElement) => {
    projectTriggerRef.current = trigger;
    setActiveProject(project);
    window.history.pushState(null, "", `#project/${encodeURIComponent(project.slug)}`);
  }, []);

  const closeProject = useCallback(() => {
    setActiveProject(null);
    window.history.pushState(null, "", "#projects");
  }, []);

  const openNextProject = useCallback((project: Project) => {
    setActiveProject(project);
    window.history.replaceState(null, "", `#project/${encodeURIComponent(project.slug)}`);
    document.querySelector(".project-detail")?.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const openLegal = useCallback((document: LegalDocument, trigger: HTMLButtonElement) => {
    legalTriggerRef.current = trigger;
    setLegal(document);
  }, []);

  const activeIndex = activeProject ? projects.findIndex((project) => project.slug === activeProject.slug) : -1;
  const nextProject = activeIndex >= 0 && projects.length > 1 ? projects[(activeIndex + 1) % projects.length] : undefined;

  return (
    <>
      <style>{`@font-face{font-family:"Lemon Milk";src:url("${import.meta.env.BASE_URL}LEMONMILK-RegularItalic.otf") format("opentype");font-display:swap;font-style:italic;font-weight:400}`}</style>
      <a className="skip-link" href="#main-content">Перейти к содержимому</a>
      <ScrollProgress />
      <CustomCursor />
      <div className="noise" aria-hidden="true" />
      <Header />
      <main id="main-content">
        <Hero />
        <Marquee />
        <ProjectsGrid projects={projects} onOpen={openProject} />
        <About />
        <Skills />
        <Contact />
      </main>
      <Footer onLegalOpen={openLegal} />
      <CookieBanner onPolicyOpen={(trigger) => openLegal("cookies", trigger)} />

      {activeProject && (
        <ProjectDetails
          key={activeProject.slug}
          project={activeProject}
          nextProject={nextProject}
          onClose={closeProject}
          onNext={openNextProject}
          returnFocusRef={projectTriggerRef}
        />
      )}
      {legal && (
        <LegalModal
          document={legal}
          onClose={() => setLegal(null)}
          returnFocusRef={legalTriggerRef}
        />
      )}
    </>
  );
}
