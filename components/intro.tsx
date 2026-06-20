"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const STAGES = ["compile", "running", "execute"] as const;
const HOLD_MS = 750;

export function Intro() {
  const [show, setShow] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);

  // useLayoutEffect fires before the browser paints — no flash in either direction
  useLayoutEffect(() => {
    if (localStorage.getItem("visited") !== "1") {
      setShow(true);
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

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-9999 flex items-center justify-center bg-background overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
        >
          <div className="flex items-center gap-3 select-none">
            {/* Terminal prompt */}
            <span
              className="font-mono text-2xl font-semibold"
              style={{ color: "var(--accent)" }}
            >
              &gt;
            </span>

            {/* Cycling word */}
            <AnimatePresence mode="wait">
              {stageIndex < STAGES.length && (
                <motion.span
                  key={stageIndex}
                  className="font-mono text-2xl font-semibold text-foreground"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  {STAGES[stageIndex]}
                  <motion.span
                    style={{ color: "var(--accent)" }}
                    animate={{ opacity: [1, 0] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "linear",
                    }}
                  >
                    _
                  </motion.span>
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
