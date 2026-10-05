import { useState } from "react";

const storageKey = "nk6357-cookie-choice";

export function CookieBanner({ onPolicyOpen }: { onPolicyOpen: (trigger: HTMLButtonElement) => void }) {
  const [visible, setVisible] = useState(() => localStorage.getItem(storageKey) === null);
  if (!visible) return null;

  const save = (choice: "accepted" | "rejected") => {
    localStorage.setItem(storageKey, choice);
    setVisible(false);
  };

  return (
    <aside className="cookie-banner" aria-label="Настройки cookies">
      <span className="cookie-banner__index" aria-hidden="true">C / 01</span>
      <p>Сайт не использует аналитику и необязательные cookies. Мы сохраняем только ваш выбор локально в браузере.</p>
      <button className="cookie-banner__policy" type="button" onClick={(event) => onPolicyOpen(event.currentTarget)}>Подробнее</button>
      <div className="cookie-banner__actions">
        <button type="button" onClick={() => save("rejected")}>Отклонить</button>
        <button type="button" className="accept" onClick={() => save("accepted")}>Принять</button>
      </div>
    </aside>
  );
}
