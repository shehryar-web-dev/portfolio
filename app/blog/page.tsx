import type { Metadata } from "next";
import { BlogCard } from "@/components/blog-card";
import { getPostMetas } from "@/lib/blog";
import { SectionHeading } from "@/components/section";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Occasional notes on backend architecture, event-driven systems, Solana integration and AI features.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const posts = getPostMetas();

  return (
    <>
      <div className="border-b border-border">
        <div className="shell container-px py-14 sm:py-20">
          <SectionHeading
            as="h1"
            eyebrow="Writing"
            title="Notes"
            description="Occasional write-ups on things I have had to work out — backend architecture, asynchronous processing, blockchain integration and AI features."
          />
        </div>
      </div>

      <div className="shell container-px py-12 sm:py-16">
        {posts.length === 0 ? (
          <p className="text-muted-foreground">Nothing published yet.</p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2">
            {posts.map((post) => (
              <li key={post.slug} className="flex">
                <BlogCard post={post} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
