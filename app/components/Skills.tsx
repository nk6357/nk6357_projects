const groups = [
  { title: "Frontend", items: ["React", "TypeScript", "Vite", "HTML", "CSS"] },
  { title: "Backend", items: ["Node.js", "APIs", "Databases"] },
  { title: "AI", items: ["LLM", "AI integrations", "Automation"] },
  { title: "Product", items: ["UX/UI", "Prototyping", "Product thinking"] },
];

export function Skills() {
  return (
    <section className="skills section-shell" aria-labelledby="skills-title">
      <header className="section-header" data-reveal>
        <div>
          <p className="section-kicker">Toolkit</p>
          <h2 id="skills-title">Технологии</h2>
        </div>
        <p className="section-intro">Инструменты выбираются под задачу. Результат всегда один — продукт, которым удобно пользоваться.</p>
      </header>

      <div className="skills__grid">
        {groups.map((group) => (
          <article className="skill-group" key={group.title} data-reveal>
            <h3>{group.title}</h3>
            <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        ))}
      </div>
    </section>
  );
}
