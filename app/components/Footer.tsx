export type LegalDocument = "privacy" | "cookies" | "terms";

interface Props {
  onLegalOpen: (document: LegalDocument, trigger: HTMLButtonElement) => void;
}

export function Footer({ onLegalOpen }: Props) {
  return (
    <footer className="footer">
      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} nk6357. Все права защищены.</p>
        <div className="footer__socials">
          <a href="https://github.com/nk6357" target="_blank" rel="noreferrer noopener">GitHub</a>
          <a href="https://t.me/nk6357" target="_blank" rel="noreferrer noopener">Telegram</a>
        </div>
        <div className="footer__legal">
          <button type="button" onClick={(event) => onLegalOpen("privacy", event.currentTarget)}>Конфиденциальность</button>
          <button type="button" onClick={(event) => onLegalOpen("cookies", event.currentTarget)}>Cookies</button>
          <button type="button" onClick={(event) => onLegalOpen("terms", event.currentTarget)}>Соглашение</button>
        </div>
      </div>
    </footer>
  );
}
