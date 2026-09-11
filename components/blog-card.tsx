import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatDate, type PostMeta } from "@/lib/blog";

export function BlogCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full w-full flex-col rounded-lg border border-border bg-background p-5 transition-colors hover:border-border-strong sm:p-6"
    >
      <p className="label flex items-center gap-2">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden="true">·</span>
        <span>{post.readingTime}</span>
      </p>
      <h2 className="mt-3 text-lg font-semibold">{post.title}</h2>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {post.description}
      </p>
      <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-foreground">
        Read
        <ArrowUpRight
          aria-hidden="true"
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </span>
    </Link>
  );
}
