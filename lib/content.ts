import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");
const PAGES_DIR = path.join(CONTENT_DIR, "pages");
const DATA_DIR = path.join(process.cwd(), "data");

export interface PageMeta {
  title: string;
  slug: string;
  date: string;
  description: string;
  canonical: string;
  type: string;
  featuredImage?: string;
}

export interface Page extends PageMeta {
  content: string;
}

export interface NavItem {
  title: string;
  href: string;
  order?: number;
}

export interface Navigation {
  header: NavItem[];
  footer: NavItem[];
}

/**
 * Get all page slugs for static generation
 */
export function getAllPageSlugs(): string[] {
  if (!fs.existsSync(PAGES_DIR)) {
    return [];
  }

  const files = fs.readdirSync(PAGES_DIR);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(".mdx", ""))
    .filter((slug) => slug !== "index"); // Exclude home page
}

/**
 * Get page data by slug
 */
export function getPageBySlug(slug: string): Page | null {
  const filename = slug === "" ? "index.mdx" : `${slug}.mdx`;
  const filePath = path.join(PAGES_DIR, filename);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    title: data.title || slug,
    slug: data.slug || slug,
    date: data.date || "",
    description: data.description || "",
    canonical: data.canonical || "",
    type: data.type || "page",
    featuredImage: data.featuredImage,
    content,
  };
}

/**
 * Get all pages
 */
export function getAllPages(): Page[] {
  const slugs = getAllPageSlugs();
  const pages: Page[] = [];

  // Add home page
  const homePage = getPageBySlug("");
  if (homePage) {
    pages.push(homePage);
  }

  // Add other pages
  for (const slug of slugs) {
    const page = getPageBySlug(slug);
    if (page) {
      pages.push(page);
    }
  }

  return pages;
}

/**
 * Get navigation data
 */
export function getNavigation(): Navigation {
  const navPath = path.join(DATA_DIR, "navigation.json");

  if (!fs.existsSync(navPath)) {
    return {
      header: [],
      footer: [],
    };
  }

  const navContent = fs.readFileSync(navPath, "utf-8");
  return JSON.parse(navContent);
}

/**
 * Get pages index for sitemap
 */
export function getPagesIndex(): PageMeta[] {
  const indexPath = path.join(DATA_DIR, "pages-index.json");

  if (!fs.existsSync(indexPath)) {
    return [];
  }

  const indexContent = fs.readFileSync(indexPath, "utf-8");
  return JSON.parse(indexContent);
}
