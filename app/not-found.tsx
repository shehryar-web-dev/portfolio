"use client";

import { ArrowLeft, Home, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { ButtonLink, buttonClasses } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <>
      <style jsx global>{`
        body:has([data-not-found-page]) [data-site-navbar],
        body:has([data-not-found-page]) [data-social-sidebar],
        body:has([data-not-found-page]) #intro-cover,
        body:has([data-not-found-page]) [data-intro-overlay] {
          display: none !important;
        }
      `}</style>

      <section
        data-not-found-page
        className="container-px mx-auto flex min-h-screen max-w-3xl items-center justify-center py-20 text-center"
      >
        <div>
          <p className="mb-4 inline-flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest text-accent">
            <Search className="h-4 w-4" aria-hidden="true" />
            404
          </p>
          <h1 className="font-display text-5xl font-black leading-none text-foreground sm:text-7xl">
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
    </>
  );
}
