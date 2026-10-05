import type { AnchorHTMLAttributes, PropsWithChildren } from "react";

type Props = PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>> & {
  variant?: "primary" | "outline" | "ghost";
};

export function ButtonLink({ children, className = "", variant = "primary", ...props }: Props) {
  return <a className={`button button--${variant} ${className}`.trim()} {...props}>{children}</a>;
}

