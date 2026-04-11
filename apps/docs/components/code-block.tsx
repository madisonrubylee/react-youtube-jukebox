import type { ReactNode } from "react";

type CodeLanguage = "bash" | "text" | "tsx";

type CodeTokenType =
  | "comment"
  | "command"
  | "function"
  | "keyword"
  | "number"
  | "operator"
  | "plain"
  | "property"
  | "string"
  | "tag"
  | "type"
  | "variable";

type CodeBlockProps = {
  children: ReactNode;
  language?: CodeLanguage;
};

type CodeToken = {
  type: CodeTokenType;
  value: string;
};

const TS_KEYWORDS = new Set([
  "as",
  "async",
  "await",
  "boolean",
  "class",
  "const",
  "default",
  "else",
  "export",
  "extends",
  "false",
  "from",
  "function",
  "if",
  "import",
  "interface",
  "let",
  "new",
  "null",
  "number",
  "return",
  "string",
  "true",
  "type",
  "undefined",
  "var",
  "void",
]);

function normalizeCode(children: ReactNode) {
  if (typeof children === "string") {
    return children;
  }

  return String(children ?? "");
}

function inferLanguage(code: string): CodeLanguage {
  const trimmed = code.trimStart();

  if (/^(pnpm|npm|yarn|bun|npx)\b/m.test(trimmed)) {
    return "bash";
  }

  if (
    /(import\s+\{|export\s+|type\s+\w+|interface\s+\w+|function\s+\w+|const\s+\w+|<[A-Z]|<\w+)/.test(
      code,
    )
  ) {
    return "tsx";
  }

  return "text";
}

function pushToken(tokens: CodeToken[], value: string, type: CodeTokenType) {
  if (value.length === 0) {
    return;
  }

  tokens.push({ type, value });
}

function tokenizeTsxLine(line: string): CodeToken[] {
  const tokens: CodeToken[] = [];
  let cursor = 0;
  let expectFunctionName = false;
  let expectTypeName = false;

  while (cursor < line.length) {
    const slice = line.slice(cursor);

    const whitespace = slice.match(/^\s+/)?.[0];
    if (whitespace) {
      pushToken(tokens, whitespace, "plain");
      cursor += whitespace.length;
      continue;
    }

    const comment = slice.match(/^\/\/.*/)?.[0];
    if (comment) {
      pushToken(tokens, comment, "comment");
      break;
    }

    const stringToken = slice.match(
      /^`(?:\\.|[^`])*`|^"(?:\\.|[^"])*"|^'(?:\\.|[^'])*'/,
    )?.[0];
    if (stringToken) {
      pushToken(tokens, stringToken, "string");
      cursor += stringToken.length;
      continue;
    }

    const jsxTag = slice.match(/^<\/?[A-Za-z][\w.-]*/)?.[0];
    if (jsxTag) {
      pushToken(tokens, jsxTag, "tag");
      cursor += jsxTag.length;
      continue;
    }

    const numberToken = slice.match(/^\d+(?:\.\d+)?/)?.[0];
    if (numberToken) {
      pushToken(tokens, numberToken, "number");
      cursor += numberToken.length;
      continue;
    }

    const identifier = slice.match(/^[A-Za-z_$][\w$]*/)?.[0];
    if (identifier) {
      const isProperty = cursor > 0 && line[cursor - 1] === ".";

      if (TS_KEYWORDS.has(identifier)) {
        pushToken(tokens, identifier, "keyword");
        expectFunctionName = identifier === "function";
        expectTypeName = identifier === "type" || identifier === "interface";
      } else if (expectFunctionName) {
        pushToken(tokens, identifier, "function");
        expectFunctionName = false;
      } else if (expectTypeName || /^[A-Z]/.test(identifier)) {
        pushToken(tokens, identifier, "type");
        expectTypeName = false;
      } else if (isProperty) {
        pushToken(tokens, identifier, "property");
      } else {
        pushToken(tokens, identifier, "plain");
      }

      cursor += identifier.length;
      continue;
    }

    const variable = slice.match(/^\$[A-Za-z_][\w]*/)?.[0];
    if (variable) {
      pushToken(tokens, variable, "variable");
      cursor += variable.length;
      continue;
    }

    const operator = slice.match(
      /^(=>|===|!==|==|!=|<=|>=|\+\+|--|\|\||&&|[=<>!?:|&+\-*/%.]+)/,
    )?.[0];
    if (operator) {
      pushToken(tokens, operator, "operator");
      cursor += operator.length;
      continue;
    }

    pushToken(tokens, slice[0] ?? "", "plain");
    cursor += 1;
  }

  return tokens;
}

function tokenizeBashLine(line: string): CodeToken[] {
  const tokens: CodeToken[] = [];
  let cursor = 0;
  let isCommandPosition = true;

  while (cursor < line.length) {
    const slice = line.slice(cursor);

    const whitespace = slice.match(/^\s+/)?.[0];
    if (whitespace) {
      pushToken(tokens, whitespace, "plain");
      cursor += whitespace.length;
      continue;
    }

    const comment = slice.match(/^#.*/)?.[0];
    if (comment) {
      pushToken(tokens, comment, "comment");
      break;
    }

    const stringToken = slice.match(
      /^"(?:\\.|[^"])*"|^'(?:\\.|[^'])*'/,
    )?.[0];
    if (stringToken) {
      pushToken(tokens, stringToken, "string");
      cursor += stringToken.length;
      isCommandPosition = false;
      continue;
    }

    const variable = slice.match(/^\$[A-Za-z_][\w]*/)?.[0];
    if (variable) {
      pushToken(tokens, variable, "variable");
      cursor += variable.length;
      isCommandPosition = false;
      continue;
    }

    const flag = slice.match(/^--?[A-Za-z0-9-]+/)?.[0];
    if (flag) {
      pushToken(tokens, flag, "property");
      cursor += flag.length;
      isCommandPosition = false;
      continue;
    }

    const command = slice.match(/^[A-Za-z0-9:_./-]+/)?.[0];
    if (command) {
      pushToken(tokens, command, isCommandPosition ? "command" : "plain");
      cursor += command.length;
      isCommandPosition = false;
      continue;
    }

    pushToken(tokens, slice[0] ?? "", "plain");
    cursor += 1;
  }

  return tokens;
}

function tokenizeLine(line: string, language: CodeLanguage) {
  if (language === "bash") {
    return tokenizeBashLine(line);
  }

  if (language === "tsx") {
    return tokenizeTsxLine(line);
  }

  return [{ type: "plain", value: line }] satisfies CodeToken[];
}

export function CodeBlock({ children, language }: CodeBlockProps) {
  const code = normalizeCode(children);
  const resolvedLanguage = language ?? inferLanguage(code);
  const lines = code.split("\n");

  return (
    <pre className="docs-code-block" data-language={resolvedLanguage}>
      <code className="docs-code-block__content">
        {lines.map((line, lineIndex) => (
          <span key={lineIndex} className="docs-code-block__line">
            {(line.length === 0
              ? [{ type: "plain", value: " " }]
              : tokenizeLine(line, resolvedLanguage)
            ).map((token, tokenIndex) => (
              <span
                key={`${lineIndex}-${tokenIndex}`}
                className={`docs-code-token docs-code-token--${token.type}`}>
                {token.value}
              </span>
            ))}
          </span>
        ))}
      </code>
    </pre>
  );
}
