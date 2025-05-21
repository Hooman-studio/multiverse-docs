import Sidebar, { type NavItem } from "./sidebar";
import { getAllMDXPages } from "@/lib/mdx";

function groupPagesToNavItems(pages: any[]): NavItem[] {
  const nav: NavItem[] = [];
  const slugsWithFile = new Set(pages.map((p) => p.slug));
  for (const page of pages) {
    const segments = page.slug.split("/");
    if (segments.length === 1) {
      nav.push({
        title: page.frontmatter.title,
        href: `/docs/${segments[0]}`,
      });
    } else if (segments.length === 2) {
      const sectionSlug = segments[0];
      let section = nav.find((n) => n.title.toLowerCase() === sectionSlug);
      if (!section) {
        // Only set href if a file exists for the section
        const sectionHref = slugsWithFile.has(sectionSlug)
          ? `/docs/${sectionSlug}`
          : null;
        section = {
          title: sectionSlug[0].toUpperCase() + sectionSlug.slice(1),
          href: sectionHref,
          items: [],
        };
        nav.push(section);
      }
      section.items!.push({
        title: page.frontmatter.title,
        href: `/docs/${segments.join("/")}`,
      });
    }
  }
  return nav;
}

export default async function SidebarServer() {
  const pages = await getAllMDXPages();
  const navItems = groupPagesToNavItems(pages);
  return <Sidebar navItems={navItems} />;
}
