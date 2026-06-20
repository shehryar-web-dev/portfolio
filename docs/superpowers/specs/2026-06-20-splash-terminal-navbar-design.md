# Splash Terminal Animation + Navbar Cleanup

**Date:** 2026-06-20

## What & Why

Two changes to the portfolio site:
1. The S logo image in the navbar doesn't fit the aesthetic — remove it, leave the left side empty so the nav links anchor to the left.
2. The splash screen wasn't showing (bug: `useState(true)` on SSR meant the overlay rendered server-side, then localStorage check instantly hid it on client hydration). Redesign with a terminal typewriter animation: `compile → run → execute`.

---

## Splash Screen Design

**Trigger:** First visit only. `localStorage.getItem("splashed")` — if absent, show and set; if present, skip entirely.

**Bug fix:** Initialize `visible` to `false` (not `true`). On `useEffect` (client only), check localStorage. If key absent, flip `visible = true` and start typing. This removes the SSR flash.

**Animation — terminal typewriter:**

Three lines typed sequentially in a centered block:
```
> compile_
> run_
> execute_
```

- `>` prompt: accent color `#00cfd1`
- Word text: foreground `#d4e8f5`
- Blinking `_` cursor: on the actively-typing line only (CSS `animate-pulse`), hidden once that line is complete
- Font: `--font-geist-mono`, 18–20px, no bold

**Sequencing (React interval-based):**
- State: `lines` array (grows as lines complete), `currentLine` (0–2), `currentChar` (index into current word)
- `setInterval` at 65ms per character advances `currentChar`; when a word is complete, increment `currentLine`, reset `currentChar`
- When `currentLine` reaches 3 (all done): 500ms hold → `AnimatePresence` exit fades the overlay out over 400ms → set localStorage key

**Words:** `["compile", "run", "execute"]`

---

## Navbar Design

Remove the logo `<Link>` from the left side of the nav entirely. No replacement. With `justify-between`, the desktop nav links move to the left and the right controls (ThemeToggle, Resume, hamburger) stay right. No layout class changes needed.

---

## Files Changed

| File | Change |
|---|---|
| `components/splash.tsx` | Full rewrite — typewriter animation, `visible` init to `false`, localStorage |
| `components/navbar.tsx` | Remove logo Link and Image import if unused elsewhere |

---

## Verification

1. Clear localStorage (`splashed` key) in DevTools
2. Reload — splash shows terminal typing `compile`, `run`, `execute` in sequence, then fades out
3. Reload again — splash does NOT appear
4. New tab — splash does NOT appear
5. Navbar: no logo on left, nav links sit on the left side, right controls on the right
6. Mobile menu still works
