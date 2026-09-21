# SkiFree-Warboy — ENDSTATE (Warboy's product charter)

This is the GOAL. Every mission cycle orients on this, not just the next checkbox.
Read it, assess the current game against it, and build the highest-value move toward it.

## North star
The definitive modern endless-downhill-skiing arcade game: a single, dependency-free,
instantly-playable `index.html` that captures the *feel* of the genre-defining 90s classic,
rendered in Warboy's OWN original art, and grown + kept alive entirely by Warboy.

## What it is — and isn't
An **original game inspired by** the downhill-skiing arcade genre. All characters,
creatures, skins, and art are **Warboy's own original designs drawn in code** — never
copies of any specific game's sprites or characters. Faithful to the *feel and mechanics*;
original in its *assets and identity*.

## The three phases — build in order, then maintain + evolve forever

### Phase 1 — Capture the feel
- Start at a ski lift / lodge, then push off downhill.
- Other skiers sharing the slope.
- Endless downhill flow over a scrolling snowfield.
- Core obstacle set: trees, rocks, moguls/jumps (+ the oil slicks & barrels already added).
- A **chase antagonist** — an original creature of Warboy's own design — that appears and
  pursues if you dawdle: tension, not just dodging.
- Jumps / tricks with air time.
- Distance + style scoring; death → instant restart.

### Phase 2 — The living slope
- Terrain / biomes change as you descend (open slope → forest → night → alpine, …).
- Escalating hazards: oil & barrels → dogs → drones, each with its own behaviour.
- Scoring with attitude: **points for style** — slaloming close to, or crashing THROUGH,
  skiers / dogs / drones; **combos & multipliers** for chains; **penalties** for hitting
  trees or wiping out on oil.
- Difficulty curve that ramps with depth.

### Phase 3 — Depth & identity (Warboy proposes these over time via assessment + research)
- Collectibles (coins), speed boosts, high-jump ramps.
- Selectable skins / characters — all original designs.
- Unlockables, daily seeds, local + shareable leaderboards.
- New modes and mechanics Warboy invents.

## The quality bar — score the game against this every cycle
1. **Faithful & complete** — the full loop above exists and feels right.
2. **Plays well** — locked 60fps, responsive controls, fair difficulty curve, juicy feedback.
3. **Universal** — loads in <1s, single file, desktop keyboard AND mobile touch, accessible
   (reduced-motion, colorblind-safe, keyboard-only).
4. **Polished** — sound, pause, persistent high scores, a version stamp, a clean HUD,
   and **zero console errors, ever**.
5. **Alive** — the deployed game is **always green** (boots + plays); regressions fixed fast.
6. **Evolving** — grows past parity with Warboy's own ideas.

## The autonomy contract — how Warboy owns this
Each cycle:
1. **ASSESS** the current game against this charter — where is the biggest gap or the best
   next evolution?
2. **BUILD** that one thing (highest value toward the endstate), in one self-contained
   `index.html`, original art only, without breaking existing play.
3. **VERIFY** via the gate (boots clean in headless Chrome + plays; the `?demo=1` auto-play
   runs). Nothing ships unless it is green.
4. **SHIP** — push → live on GitHub Pages — and log it.

When the roadmap runs low, **write new roadmap items yourself toward this endstate — do
not stop.** Keep it "always green" forever. This is your product. Make it great and keep it
alive.
