import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="mt-2 scroll-m-20 text-4xl font-bold tracking-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 scroll-m-20 border-b border-gray-11 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-8 scroll-m-20 text-xl font-semibold tracking-tight">
        {children}
      </h4>
    ),
    h5: ({ children }) => (
      <h5 className="mt-8 scroll-m-20 text-lg font-semibold tracking-tight">
        {children}
      </h5>
    ),
    h6: ({ children }) => (
      <h6 className="mt-8 scroll-m-20 text-base font-semibold tracking-tight">
        {children}
      </h6>
    ),
    a: ({ href, children }) => {
      const isExternal = href?.startsWith("http");
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brand-rose-1 underline underline-offset-4"
          >
            {children}
          </a>
        );
      }
      return (
        <Link
          href={href || "#"}
          className="font-medium text-brand-rose-1 underline underline-offset-4"
        >
          {children}
        </Link>
      );
    },
    p: ({ children }) => (
      <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">{children}</ol>
    ),
    li: ({ children }) => <li>{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-2 border-gray-7 pl-6 italic">
        {children}
      </blockquote>
    ),
    img: ({ src, alt, width, height }) => (
      <Image
        src={src || ""}
        alt={alt || ""}
        width={Number(width) || 1200}
        height={Number(height) || 630}
        className="rounded-md border border-gray-11"
      />
    ),
    hr: () => <hr className="my-8 border-gray-11" />,
    table: ({ children }) => (
      <div className="my-6 w-full overflow-y-auto">
        <table className="w-full overflow-hidden rounded-md border border-gray-11">
          {children}
        </table>
      </div>
    ),
    tr: ({ children }) => (
      <tr className="m-0 border-t border-gray-11 p-0">{children}</tr>
    ),
    th: ({ children }) => (
      <th className="border border-gray-11 px-4 py-2 text-left font-bold">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border border-gray-11 px-4 py-2 text-left">{children}</td>
    ),
    code: ({ className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || "");
      if (match && typeof children === "string") {
        return <CodeBlock language={match[1]} code={children} {...props} />;
      }
      return (
        <code
          className="relative rounded bg-gray-11 px-[0.3rem] py-[0.2rem] font-mono text-sm"
          {...props}
        >
          {children}
        </code>
      );
    },
    pre: ({ children }) => <>{children}</>,
    ...components,
  };
}
