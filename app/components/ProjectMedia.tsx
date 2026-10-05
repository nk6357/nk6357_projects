import { useState } from "react";

interface Props {
  src: string | null;
  alt: string;
  title: string;
  color: string;
  eager?: boolean;
  className?: string;
}

export function ProjectMedia({ src, alt, title, color, eager = false, className = "" }: Props) {
  const [failed, setFailed] = useState(false);
  const url = src ? `${import.meta.env.BASE_URL}${src}` : null;

  return (
    <div className={`project-media ${className}`.trim()} style={{ "--project-color": color } as React.CSSProperties}>
      {url && !failed ? (
        <img
          src={url}
          alt={alt}
          width="1600"
          height="1000"
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="project-media__fallback" role="img" aria-label={`Обложка проекта «${title}»`}>
          <span>{title}</span>
          <i aria-hidden="true">NK / DIGITAL</i>
        </div>
      )}
    </div>
  );
}

