import { ButtonLink } from "./ButtonLink";

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__meta hero__meta--top">
        <span>PORTFOLIO / 2026</span>
        <span>56.8389° N — 60.6057° E</span>
      </div>

      <div className="hero__copy">
        <p className="hero__eyebrow"><span>Digital</span> products from idea to launch</p>
        <h1 className="hero__title" id="hero-title" aria-label="nk6357 — Digital Product Engineer">
          <span className="hero__line hero__line--brand"><span>NK6357</span></span>
          <span className="hero__line hero__line--digital"><span>DIGITAL PRODUCT</span></span>
          <span className="hero__line hero__line--engineer"><span>ENGINEER</span></span>
        </h1>
      </div>

      <div className="hero__bottom">
        <p className="hero__description">
          Создаю цифровые продукты полного цикла: от идеи и интерфейса до работающего приложения.
        </p>
        <p className="hero__disciplines">Full-stack <i>×</i> AI <i>×</i> Product <i>×</i> Design</p>
        <div className="hero__actions">
          <ButtonLink href="#projects">Смотреть проекты <span aria-hidden="true">↘</span></ButtonLink>
          <ButtonLink href="#contact" variant="outline">Связаться</ButtonLink>
        </div>
      </div>

      <div className="hero__version" aria-hidden="true">
        <span>INDEX</span><strong>01</strong><small>V.2.0</small>
      </div>
      <a className="hero__scroll" href="#projects" aria-label="Прокрутить к проектам">
        <span>Scroll to explore</span><i aria-hidden="true">↓</i>
      </a>
    </section>
  );
}

