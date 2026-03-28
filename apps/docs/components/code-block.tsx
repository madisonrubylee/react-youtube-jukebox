import type { ReactNode } from "react";

type CodeBlockProps = {
  children: ReactNode;
};

export function CodeBlock({ children }: CodeBlockProps) {
  return (
    <pre className="docs-code-block">
      <code className="docs-code-block__content">{children}</code>
    </pre>
  );
}
