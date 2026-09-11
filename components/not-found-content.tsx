"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ButtonLink, buttonClasses } from "@/components/ui/button";

export function NotFoundContent() {
  const router = useRouter();

  return (
    <main
      data-not-found-page
      className="flex min-h-screen items-center justify-center px-5 py-24"
    >
      <div className="max-w-md">
        <p className="label">404</p>
        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Page not found</h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          That page does not exist, or it has moved. Project case studies now live under{" "}
          <code className="rounded border border-border bg-surface px-1.5 py-0.5">
            /work/[slug]
          </code>
          , linked from the work section on the home page.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/" size="md">
            Home
          </ButtonLink>
          <ButtonLink href="/#work" variant="outline" size="md">
            All work
          </ButtonLink>
          <button
            type="button"
            onClick={() => router.back()}
            className={buttonClasses("ghost", "md")}
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            Go back
          </button>
        </div>
      </div>
    </main>
  );
}
