import { notFound } from "next/navigation";
import { getMDXPage, getAllMDXPages } from "@/lib/mdx";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const slug = (await params).slug || ["index"];
  console.log(slug);
  const page = await getMDXPage(slug);

  if (!page) {
    return {
      title: "Not Found",
      description: "The page you are looking for does not exist.",
    };
  }

  return {
    title: page.frontmatter.title,
    description: page.frontmatter.description || "Multiverse Docs",
  };
}

export default async function DocsPage({ params }: PageProps) {
  const slug = (await params).slug || ["index"];
  const page = await getMDXPage(slug);

  if (!page) {
    notFound();
  }

  return (
    <article className="mdx-content">
      <h1>{page.frontmatter.title}</h1>
      {page.frontmatter.description && (
        <p className="text-xl text-gray-7 dark:text-gray-5">
          {page.frontmatter.description}
        </p>
      )}
      <hr className="my-8 border-gray-4 dark:border-gray-11" />
      {page.content}
    </article>
  );
}

export async function generateStaticParams() {
  const pages = await getAllMDXPages();
  return pages.map((page) => ({
    slug: page.slug.split("/"),
  }));
}
