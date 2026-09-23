# SkiFree-Warboy — roadmap

The seed backlog toward `ENDSTATE.md`. Warboy works it top-down, one item per cycle,
checks an item off in the commit that lands it, and — when it runs low — **writes new
items itself** by assessing the game against the ENDSTATE charter. The game stays ONE
dependency-free `index.html`; every change must boot clean (headless Chrome, zero console
errors) and play. Original art only — Warboy's own characters/skins, never copies.

## ⚡ Operator injections (Immortan's direction — built FIRST, before the phases)
This is the redirect lane. Items here are built before the phased backlog, in order. Add
`- [ ] …` to inject work or begin a new goal; check/remove an item to retire it; change the
whole direction by editing ENDSTATE.md; end/begin the mission itself via its systemd timer.
Operator direction from the daily report lands here.

- [x] Achievements system (Fallout-style unlock popups, but your OWN original visual design): track lifetime counters in localStorage (drones crashed, skiers hit, oil wipeouts, jumps landed, distance, etc.). When a threshold is crossed mid-run, show a witty "ACHIEVEMENT UNLOCKED" toast with the name, and add it to a persistent achievements list viewable from the start/pause screen; unlocking is permanent across runs and must not change play balance. Seed these exact ones, then EXTEND with more in the same witty Warboy/Wasteland voice: drones — 5 = "Dronebuster", 15 = "Skislope Mechanic"; skiers — 5 = "Outta the Way!!", 10 = "Move it Meatbags!", 25 = "The Flesh is Weak", 50 = "Organic Mechanic"; oil — 1st wipeout = "Slick Willy".

## Phase 1 — Capture the feel
- [x] Attract / demo mode: an auto-player behind the `?demo=1` URL flag that starts runs, dodges deadly obstacles, jumps hazards, and restarts after game-over. Off by default; must not change normal play.
- [x] Ski-lift / lodge start: a short intro at a lift/lodge, then the player pushes off downhill into the run (skippable with a key / tap).
- [ ] Other skiers: NPC skiers share the slope, carving their own lines; the player can weave around (or into) them.
- [ ] Chase antagonist: an ORIGINAL creature of Warboy's own design appears if the player dawdles / after a distance, and pursues — catching you ends the run. Original art only.
- [ ] Tricks & air: launching off a jump/mogul gives air time and a simple trick (rotation/grab) that awards style points on a clean landing.
- [ ] Pause: `P` toggles a dimmed "PAUSED" overlay; the loop must not advance while paused.

## Phase 2 — The living slope
- [ ] Terrain progression: the biome visibly changes with depth (open slope → forest → dusk/night → alpine), affecting palette and obstacle density.
- [ ] Dogs hazard: a moving dog that crosses/chases briefly; colliding costs a wipeout unless you're set up to score off it.
- [ ] Drones hazard: a hovering drone that tracks the player laterally; a deeper-run hazard with its own movement.
- [ ] Scoring system with attitude: points for style — slaloming close to or crashing THROUGH skiers/dogs/drones — with a combo multiplier for chains; penalties for hitting trees or wiping out on oil. Show score + combo on the HUD.
- [ ] Sound: minimal WebAudio SFX (jump, land, crash, score, chase) synthesized in code (no files); `M` mutes; muted state persists in localStorage.
- [ ] Mobile controls: on touch devices, two translucent steer zones + a jump button; prevent page scroll/zoom while playing.

## Phase 3 — Depth & identity
- [ ] Coins / collectibles: pickups on the slope that add to score; a light risk/reward line to chase.
- [ ] Speed boosts: boost pads/pickups that briefly increase speed (and risk); clear visual feedback.
- [ ] High-jump ramps: special ramps that launch bigger air for bigger trick scores.
- [ ] Selectable skins: a small selection of ORIGINAL player skins/characters, chosen on the start screen and persisted.
- [ ] Version + changelog: a `v0.x` stamp in the HUD read from one constant; keep CHANGELOG.md current.
- [ ] Seeded runs: `?seed=<n>` makes terrain generation deterministic (share a course); show the seed on the results screen.
- [ ] High-score initials: the local board records three-letter initials with an arcade-style entry screen.
- [ ] Leaderboard polish: a persistent top-scores board with dates; groundwork for shareable/daily seeds.
- [ ] Reduced motion: honor `prefers-reduced-motion` by damping screen shake and particle bursts.
- [ ] Performance: pool/recycle obstacle objects and cap the live count so long runs stay at 60fps on low-end devices.
