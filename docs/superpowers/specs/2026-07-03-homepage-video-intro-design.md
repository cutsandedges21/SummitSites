# Homepage Video Intro — Design

Date: 2026-07-03

## Goal

Replace the laptop/phone scroll-zoom intro on route `/` with a fullscreen intro
video that plays on load, then crossfades into the existing homepage (background
`wink_4k` video + entrance text animations).

## Behavior

- **Replay:** once per browser session (`sessionStorage.introPlayed`). Return
  visits within the same session skip straight to the homepage.
- **Transition:** crossfade — intro video fades out (~700ms) while the homepage
  text animates in.
- **Skip:** none. Intro always plays fully (unless it errors — see Edge cases).
- **Assets:** desktop `/new_homepage.mp4`, mobile `/new_iphone_homepage.mp4`.
  Breakpoint `window.innerWidth < 768` (matches current logic).

## Architecture

New component `src/components/HomeIntro.jsx` replaces `LaptopZoom` on route `/`.

Phases: `intro` → `home`.

1. On mount, read `sessionStorage.introPlayed`.
   - Unset → start in `intro` phase.
   - Set → start in `home` phase (revealed), no intro video.
2. `Homepage` is mounted underneath from the start with `revealed={false}`, so the
   `wink_4k` background video preloads/plays behind the opaque intro overlay. This
   avoids a black flash on crossfade.
3. Intro video: fullscreen, `muted autoPlay playsInline`, correct src per viewport.
   `onEnded` → set `sessionStorage.introPlayed`, flip `revealed=true` (existing
   entrance animations play), fade the intro overlay opacity 1→0 over ~700ms, then
   unmount it.

### Desktop scroll

The fake-scroll driver currently in `LaptopZoom` (rAF smoothing of `scrollY`,
wheel/touch handlers, `onMaxScroll` clamp) moves into `HomeIntro`, active only in
`home` phase and only on desktop. `Homepage` receives `scrollY`, `progress={1}`,
`revealed`, `onMaxScroll`. Rendered in a fixed full-viewport container, same as
today's post-zoom desktop.

### Mobile

`home` phase renders `<Homepage revealed isMobile native />` in normal document
flow — native scrolling, identical to today's post-zoom mobile path.

## Edge cases

- Autoplay blocked or video error (`onError`) → skip immediately to `home`.
- Safety timeout (~15s) → if the intro never ends, advance to `home` so no one
  gets stuck.
- Body scroll locked while the intro overlay is visible.

## Cleanup

- Delete `src/components/LaptopZoom.jsx`.
- Update `src/App.jsx` import + route `/` to `HomeIntro`.
- Remove the now-dead `isMobile && !revealed` pre-reveal branch in `Homepage.jsx`.
- Leave laptop/phone PNGs in `public/` (unused, harmless).

## Out of scope

- Intro video audio, skip controls, per-visitor (localStorage) gating.
