import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/profile";
import { getAllPosts } from "@/lib/blog";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const posts = getAllPosts().map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  const projectRoutes = projects.map((project) => ({
    url: `${base}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    { url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/projects`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    ...projectRoutes,
    ...posts,
  ];
}
