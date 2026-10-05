const groups = [
  { number: "01", title: "Frontend", items: ["React", "TypeScript", "Vite", "HTML", "CSS"] },
  { number: "02", title: "Backend", items: ["Node.js", "APIs", "Databases"] },
  { number: "03", title: "AI", items: ["LLM", "AI integrations", "Automation"] },
  { number: "04", title: "Product", items: ["UX/UI", "Prototyping", "Product thinking"] },
];

export function Skills() {
  return (
    <section className="skills section-shell" aria-labelledby="skills-title">
      <header className="section-header" data-reveal>
        <div>
          <p className="section-kicker"><span>03</span> Toolkit</p>
          <h2 id="skills-title">Технологии</h2>
        </div>
        <p className="section-intro">Инструменты выбираются под задачу. Результат всегда один — продукт, которым удобно пользоваться.</p>
      </header>

      <div className="skills__grid">
        {groups.map((group) => (
          <article className="skill-group" key={group.title} data-reveal>
            <span className="skill-group__number">{group.number}</span>
            <h3>{group.title}</h3>
            <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        ))}
      </div>
    </section>
  );
}

