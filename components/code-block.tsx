import type { BundledLanguage } from "shiki";
import { codeToHtml } from "shiki";
import React from "react";
import { CopyButton } from "./copy-clipboard";

interface CodeBlockProps {
  code: string;
  language: BundledLanguage;
  filename?: string;
  highlightLines?: number[];
}

// Server component
export async function CodeBlock({ code, language }: CodeBlockProps) {
  // Highlight code using Shiki
  const html = await codeToHtml(code, {
    lang: language,
    theme: "github-dark",
  });

  return (
    <div className="relative">
      <CopyButton code={code} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
