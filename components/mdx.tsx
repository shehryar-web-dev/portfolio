import Link from "next/link";
import type { ComponentProps } from "react";

/** Custom element styling for rendered MDX content. */
export const mdxComponents = {
  h1: (props: ComponentProps<"h1">) => (
    <h1 className="mt-10 text-3xl font-bold tracking-tight" {...props} />
  ),
  h2: (props: ComponentProps<"h2">) => (
    <h2 className="mt-10 text-2xl font-bold tracking-tight" {...props} />
  ),
  h3: (props: ComponentProps<"h3">) => (
    <h3 className="mt-8 text-xl font-semibold" {...props} />
  ),
  p: (props: ComponentProps<"p">) => (
    <p className="mt-5 leading-relaxed text-muted-foreground" {...props} />
  ),
  ul: (props: ComponentProps<"ul">) => (
    <ul
      className="mt-5 list-disc space-y-2 pl-6 text-muted-foreground"
      {...props}
    />
  ),
  ol: (props: ComponentProps<"ol">) => (
    <ol
      className="mt-5 list-decimal space-y-2 pl-6 text-muted-foreground"
      {...props}
    />
  ),
  li: (props: ComponentProps<"li">) => <li className="leading-relaxed" {...props} />,
  a: ({ href = "#", ...props }: ComponentProps<"a">) => {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal) {
      return (
        <Link href={href} className="text-accent underline underline-offset-2" {...props} />
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent underline underline-offset-2"
        {...props}
      />
    );
  },
  blockquote: (props: ComponentProps<"blockquote">) => (
    <blockquote
      className="mt-6 border-l-2 border-accent pl-4 italic text-foreground/80"
      {...props}
    />
  ),
  code: (props: ComponentProps<"code">) => (
    <code
      className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-accent"
      {...props}
    />
  ),
  pre: (props: ComponentProps<"pre">) => (
    <pre
      className="mt-6 overflow-x-auto rounded-xl border border-border bg-muted p-4 text-sm [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-foreground"
      {...props}
    />
  ),
  hr: (props: ComponentProps<"hr">) => (
    <hr className="my-10 border-border" {...props} />
  ),
  img: (props: ComponentProps<"img">) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="mt-6 rounded-xl border border-border" alt="" {...props} />
  ),
};
