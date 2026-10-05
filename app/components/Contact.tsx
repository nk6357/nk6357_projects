import { ButtonLink } from "./ButtonLink";

export function Contact() {
  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-section__orb" aria-hidden="true" />
      <div className="contact-section__meta">
        <span>04 / Contact</span><span>Open for collaborations</span>
      </div>
      <h2 id="contact-title" data-reveal>
        <span>Есть идея?</span>
        <span>Давайте создадим</span>
        <span>что-то <em>сильное.</em></span>
      </h2>
      <div className="contact-section__bottom" data-reveal>
        <p>Расскажите о задаче — отвечу в Telegram и помогу превратить идею в ясный, работающий продукт.</p>
        <ButtonLink href="https://t.me/nk6357" target="_blank" rel="noreferrer noopener" className="button--large">
          Обсудить проект <span aria-hidden="true">↗</span>
        </ButtonLink>
      </div>
      <div className="contact-links">
        <a href="https://t.me/nk6357" target="_blank" rel="noreferrer noopener"><span>Telegram</span><strong>@nk6357</strong><i aria-hidden="true">↗</i></a>
        <a href="https://github.com/nk6357" target="_blank" rel="noreferrer noopener"><span>GitHub</span><strong>/nk6357</strong><i aria-hidden="true">↗</i></a>
      </div>
    </section>
  );
}

