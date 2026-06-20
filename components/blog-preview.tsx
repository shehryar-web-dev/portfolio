import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { BlogCard } from "@/components/blog-card";
import { getPostMetas } from "@/lib/blog";

export function BlogPreview() {
  const posts = getPostMetas().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <Section
      id="blog"
      eyebrow="Blog"
      title="Writing & notes"
      description="Occasional posts on what I'm building and learning across web, blockchain, and AI."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={i * 0.06}>
            <BlogCard post={post} />
          </Reveal>
        ))}
      </div>

      <div className="mt-10">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
        >
          View all posts <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Section>
  );
}
