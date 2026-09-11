import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/profile";
import { getAllPosts } from "@/lib/blog";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const posts = getAllPosts().map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const caseStudies = projects.map((project) => ({
    url: `${base}/work/${project.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    { url: base, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...caseStudies,
    { url: `${base}/blog`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    ...posts,
  ];
}
