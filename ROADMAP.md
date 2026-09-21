# SkiFree '91 — Warboy roadmap

Warboy works this list top-down, one item per mission cycle. Each item is small,
self-contained (the game stays ONE dependency-free `index.html`), and must pass the
gate (`node --check` on the script, a headless-Chrome boot with zero console errors,
and — once it exists — a `?demo=1` auto-play run). Warboy checks an item off in the
same commit that lands it and adds a line to CHANGELOG.md. Humans: add ideas at the
bottom; reorder freely; Warboy never edits a checked item.

- [ ] Attract / demo mode: add an auto-player behind the `?demo=1` URL flag that starts runs, dodges deadly obstacles, jumps drones, and restarts after game-over (reference logic in `reference/autoplayer_bot.js.txt`). Off by default; must not change normal play.
- [ ] Pause: `P` toggles a paused state with a dimmed "PAUSED" overlay; the game loop must not advance while paused; resuming continues from the same state.
- [ ] Sound: minimal WebAudio SFX (jump, land, crash, caught, escape chime) synthesized in code (no audio files); `M` mutes; muted state persists in localStorage.
- [ ] Mobile controls: on touch devices show two translucent on-screen steer zones plus a jump button; prevent page scroll/zoom while playing.
- [ ] Version + changelog: stamp a `v0.x` in the HUD corner read from one constant, and keep CHANGELOG.md current.
- [ ] Seeded runs: `?seed=<n>` makes terrain generation deterministic (share a course); show the seed on the results screen.
- [ ] High-score initials: the local board records three-letter initials with an arcade-style entry screen.
- [ ] Reduced motion: honor `prefers-reduced-motion` by damping screen shake and particle bursts.
- [ ] Performance: pool/recycle obstacle objects and cap the live obstacle count so long runs stay at 60 fps on low-end devices.
- [ ] New hazard: a moving snowmobile that crosses the slope horizontally; near-misses award style points.
