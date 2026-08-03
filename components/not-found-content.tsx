"use client";

import { ArrowLeft, Home, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { ButtonLink, buttonClasses } from "@/components/ui/button";

export function NotFoundContent() {
  const router = useRouter();

  return (
    <section
      data-not-found-page
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-background px-5 py-20 text-center text-foreground"
    >
      <div>
        <p className="mb-4 inline-flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest text-accent">
          <Search className="h-4 w-4" aria-hidden="true" />
          404
        </p>
        <h1 className="font-display text-5xl font-black leading-none sm:text-7xl">
          Page not found
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
          The page you requested does not exist or may have moved.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className={buttonClasses("outline", "lg")}
          >
            <ArrowLeft className="h-4 w-4" />
            Go back
          </button>
          <ButtonLink href="/" size="lg">
            <Home className="h-4 w-4" />
            Home
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
