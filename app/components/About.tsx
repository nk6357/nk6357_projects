export function About() {
  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <div className="section-shell">
        <header className="section-header section-header--light" data-reveal>
          <div>
            <p className="section-kicker"><span>02</span> About</p>
            <h2 id="about-title">Обо мне</h2>
          </div>
          <p className="section-intro">На стыке инженерии, продукта и визуального языка.</p>
        </header>

        <div className="about__statement" data-reveal>
          <p>Я проектирую и создаю цифровые продукты, объединяя <em>разработку</em>, интерфейсы, автоматизацию и <em>AI.</em></p>
          <p>Работаю с продуктом целиком — от идеи и структуры до запуска.</p>
        </div>

      </div>
    </section>
  );
}
