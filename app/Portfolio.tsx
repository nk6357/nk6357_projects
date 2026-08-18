"use client";

import { useEffect, useState } from "react";
import { fontFile, projects } from "./generated-content";

type LegalDoc = "privacy" | "cookies" | "terms" | null;

export function Portfolio() {
  const [cookieVisible, setCookieVisible] = useState(() => localStorage.getItem("cookie-choice") === null);
  const [legal, setLegal] = useState<LegalDoc>(null);

  const acceptCookies = () => {
    localStorage.setItem("cookie-choice", "accepted");
    document.cookie = "portfolio_cookie_consent=accepted; Max-Age=31536000; Path=/; SameSite=Lax; Secure";
    window.dispatchEvent(new CustomEvent("cookie-consent-granted"));
    setCookieVisible(false);
  };

  const rejectCookies = () => {
    localStorage.setItem("cookie-choice", "rejected");
    setCookieVisible(false);
  };

  return (
    <main className="site-shell">
      {fontFile && <style>{`@font-face{font-family:"Lemon Milk";src:url("${fontFile}") format("opentype");font-display:swap;font-style:italic;font-weight:400}`}</style>}
      <div className="noise" aria-hidden="true" />
      <nav className="nav" aria-label="Главная навигация">
        <a className="logo" href="#top">nk6357</a>
        <div className="nav-links">
          <a href="#projects">Проекты</a>
          <a href="#contact">Контакты</a>
        </div>
      </nav>

      <section className="poster" id="top" aria-label="nk6357 — Digital Product Engineer">
        <img className="poster-image" src="./og.png" alt="NK6357 — Digital Product Engineer. Full-stack, Product, Design." />
      </section>

      <section className="section" id="projects">
        <header className="section-head">
          <h2 className="section-title">Проекты</h2>
        </header>
        <div className="projects">
          {projects.length ? projects.map((project) => (
            <article className="project-card" key={project.number}>
              <span className="project-number">{String(project.number).padStart(2, "0")}</span>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-about">{project.about || "Цифровой продукт — подробнее по ссылке."}</p>
              <a className="project-link" href={project.link} target="_blank" rel="noreferrer">Посмотреть проект</a>
            </article>
          )) : (
            <p className="empty">Добавьте в папку projects файлы 1.txt и link1.txt — первая карточка появится здесь автоматически после публикации.</p>
          )}
        </div>
      </section>

      <section className="section contact" id="contact">
        <header className="section-head"><h2 className="section-title">Контакты</h2></header>
        <div className="contact-links">
          <a className="social-link" href="https://github.com/nk6357" target="_blank" rel="noreferrer">GitHub</a>
          <a className="social-link" href="https://t.me/nk6357" target="_blank" rel="noreferrer">Telegram · @nk6357</a>
        </div>
        <footer className="footer">
          <div className="footer-mark">nk6357</div>
          <div className="legal-links">
            <button onClick={() => setLegal("privacy")}>Политика конфиденциальности</button>
            <button onClick={() => setLegal("cookies")}>Политика cookies</button>
            <button onClick={() => setLegal("terms")}>Пользовательское соглашение</button>
          </div>
        </footer>
      </section>

      {cookieVisible && (
        <aside className="cookie-banner" aria-label="Настройки cookies">
          <p>Сайт использует cookies только после вашего согласия. Сейчас аналитика и рекламные технологии не подключены. Подробнее — в политике cookies.</p>
          <div className="cookie-actions"><button onClick={rejectCookies}>Отклонить</button><button className="accept" onClick={acceptCookies}>Согласен</button></div>
        </aside>
      )}

      {legal && <LegalModal document={legal} onClose={() => setLegal(null)} />}
    </main>
  );
}

function LegalModal({ document, onClose }: { document: Exclude<LegalDoc, null>; onClose: () => void }) {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const titles = { privacy: "Политика конфиденциальности", cookies: "Политика cookies", terms: "Пользовательское соглашение" };
  return (
    <div className="legal-overlay" role="dialog" aria-modal="true" aria-labelledby="legal-title" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <article className="legal-panel">
        <button className="legal-close" onClick={onClose} aria-label="Закрыть">×</button>
        <h2 id="legal-title">{titles[document]}</h2>
        {document === "privacy" && <Privacy />}
        {document === "cookies" && <Cookies />}
        {document === "terms" && <Terms />}
      </article>
    </div>
  );
}

function Privacy() {
  return <>
    <p className="legal-note"><strong>Перед публикацией:</strong> замените «[ФИО ВЛАДЕЛЬЦА]» и контактный адрес на свои данные. Шаблон рассчитан на информационное портфолио без форм обратной связи.</p>
    <p>Редакция от 18 августа 2026 года.</p>
    <h3>1. Общие положения</h3><p>Настоящая политика определяет порядок обработки информации посетителей сайта. Оператор: [ФИО ВЛАДЕЛЬЦА]. Контакт для обращений: Telegram @nk6357.</p>
    <h3>2. Обрабатываемая информация</h3><p>Сайт не содержит форм регистрации и обратной связи и самостоятельно не запрашивает имя, телефон или адрес электронной почты. Технический хостинг GitHub Pages может получать стандартные данные сетевого запроса, включая IP-адрес, дату и время обращения, адрес запрошенной страницы и данные браузера, в соответствии с политикой GitHub.</p>
    <h3>3. Цели и основания</h3><p>Техническая информация используется для доставки содержимого, обеспечения безопасности и работоспособности сайта. Необязательные cookies могут применяться только после отдельного согласия посетителя.</p>
    <h3>4. Передача и хранение</h3><p>Сайт размещён на GitHub Pages. Переход по внешним ссылкам на GitHub и Telegram регулируется документами соответствующих сервисов. Оператор не продаёт персональные данные и не использует их для автоматизированного принятия решений.</p>
    <h3>5. Права посетителя</h3><p>Посетитель вправе запросить сведения об обработке данных, потребовать их уточнения, блокирования или удаления, а также отозвать согласие через указанный контакт. Обращение рассматривается в сроки, предусмотренные законодательством Российской Федерации.</p>
    <h3>6. Изменения</h3><p>Политика может обновляться при изменении функций сайта или законодательства. Актуальная редакция всегда доступна в футере.</p>
  </>;
}

function Cookies() {
  return <>
    <p>Редакция от 18 августа 2026 года.</p>
    <h3>1. Что такое cookies</h3><p>Cookies — небольшие фрагменты данных, сохраняемые браузером. Они могут использоваться для запоминания настроек и измерения работы сайта.</p>
    <h3>2. Использование на этом сайте</h3><p>До нажатия кнопки «Согласен» сайт не создаёт cookies и не запускает необязательную аналитику. Выбор «Отклонить» хранится локально в браузере без cookie. После согласия создаётся технический cookie portfolio_cookie_consent сроком до одного года, подтверждающий сделанный выбор.</p>
    <h3>3. Управление согласием</h3><p>Cookies можно удалить или заблокировать в настройках браузера. После удаления cookie сайт может повторно запросить согласие. Если в будущем будет подключена аналитика, она должна запускаться только после события согласия и быть отражена в этой политике.</p>
    <h3>4. Сторонние сайты</h3><p>GitHub и Telegram могут применять собственные cookies после перехода по внешней ссылке. Сайт не управляет настройками этих сервисов.</p>
  </>;
}

function Terms() {
  return <>
    <p>Редакция от 18 августа 2026 года.</p>
    <h3>1. Назначение сайта</h3><p>Сайт является информационным портфолио и содержит сведения об авторе и выполненных проектах. Использование сайта означает согласие с настоящими условиями.</p>
    <h3>2. Интеллектуальные права</h3><p>Тексты, дизайн и авторские материалы принадлежат владельцу сайта либо используются на законном основании. Копирование материалов допускается только с согласия правообладателя, кроме случаев, прямо разрешённых законом.</p>
    <h3>3. Внешние ссылки</h3><p>Сайт содержит ссылки на сторонние ресурсы. Владелец не контролирует их содержание, доступность и правила обработки данных.</p>
    <h3>4. Ограничение ответственности</h3><p>Информация представлена в ознакомительных целях. Владелец стремится поддерживать её актуальность, но не гарантирует отсутствие технических ошибок или постоянную доступность сайта.</p>
    <h3>5. Обратная связь</h3><p>По вопросам использования сайта и материалов можно обратиться через Telegram: @nk6357.</p>
  </>;
}
