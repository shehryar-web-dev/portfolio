import type { Metadata } from "next";
import { BlogCard } from "@/components/blog-card";
import { getPostMetas } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Posts on building web apps, Solana dApps, and AI products by Shehryar.",
};

export default function BlogIndexPage() {
  const posts = getPostMetas();

  return (
    <div className="mx-auto w-full max-w-5xl px-5 pb-24 pt-28">
      <header className="mb-12 max-w-2xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide gradient-text">
          Blog
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Writing & notes
        </h1>
        <p className="mt-4 text-muted-foreground">
          Thoughts on what I&apos;m building and learning across web, blockchain, and
          AI.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-muted-foreground">No posts yet — check back soon.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
