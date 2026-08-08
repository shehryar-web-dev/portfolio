"use client";

import { useEffect, useLayoutEffect, useState } from "react";

const STAGES = ["compile", "running", "execute"] as const;
const HOLD_MS = 750;

export function Intro() {
  const [show, setShow] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);

  // useLayoutEffect fires before the browser paints — no flash in either direction
  useLayoutEffect(() => {
    if (document.querySelector("[data-not-found-page]")) {
      document.getElementById("intro-cover")?.remove();
      document.body.style.overflow = "";
      return;
    }

    if (localStorage.getItem("visited") !== "1") {
      queueMicrotask(() => setShow(true));
      document.body.style.overflow = "hidden";
    }
  }, []);

  // Cycle through stages once visible
  useEffect(() => {
    if (!show) return;

    if (stageIndex >= STAGES.length) {
      localStorage.setItem("visited", "1");
      document.body.style.overflow = "";
      document.getElementById("intro-cover")?.remove();
      const t = setTimeout(() => setShow(false), 450);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => setStageIndex((i) => i + 1), HOLD_MS);
    return () => clearTimeout(t);
  }, [show, stageIndex]);

  // Restore overflow if component unmounts early
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (!show) {
    return null;
  }

  return (
    <div
      key="intro"
      data-intro-overlay
      className="fixed inset-0 z-9999 flex items-center justify-center bg-background overflow-hidden"
    >
      <div className="flex items-center gap-3 select-none">
        <span
          className="font-mono text-2xl font-semibold"
          style={{ color: "var(--foreground)" }}
        >
          &gt;
        </span>

        <span className="font-mono text-2xl font-semibold text-foreground">
          {STAGES[stageIndex] ?? STAGES[STAGES.length - 1]}
          <span
            style={{ color: "var(--foreground)" }}
            className="animate-pulse"
          >
            _
          </span>
        </span>
      </div>
    </div>
  );
}
