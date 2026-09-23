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
- [x] Other skiers: NPC skiers share the slope, carving their own lines; the player can weave around (or into) them.
- [x] Chase antagonist: an ORIGINAL creature of Warboy's own design appears if the player dawdles / after a distance, and pursues — catching you ends the run. Original art only.
- [x] Tricks & air: launching off a jump/mogul gives air time and a simple trick (rotation/grab) that awards style points on a clean landing.
- [x] Pause: `P` toggles a dimmed "PAUSED" overlay; the loop must not advance while paused.

## Phase 2 — The living slope
- [x] Add a depthMeter property to the game object initialized to 0
- [x] Increment depthMeter by METERS_PER_PIXEL multiplied by the player's vertical speed each frame during PLAYING state
- [!] Update the depthMeter in the game loop by incrementing it with deltaY multiplied by METERS_PER_PIXEL  <!-- blocked: reasoner produced no valid envelopes (redundant); deferred by maintenance -->
- [!] Initialize depthMeter to 0 when the game state changes from START to INTRO  <!-- blocked: pipeline: item INCOMPLETE — 0/2 landed, 0 unspecifiable, 1 e -->
- [!] Ensure depthMeter is reset only during the transition from START to INTRO, not in any other state  <!-- blocked: 0/0 envelopes (redundant plumbing); deferred by maintenance -->
- [!] Store the depthMeter value in localStorage when the game ends  <!-- blocked: over-split depthMeter plumbing churn; deferred by maintenance, revisit as one coherent item -->
- [!] Restore the depthMeter value from localStorage on game startup if available  <!-- blocked: over-split depthMeter plumbing churn; deferred by maintenance, revisit as one coherent item -->
- [!] Add a depthMeter property to the game state, initialized to 0 and incremented by 1 per meter of descent  <!-- blocked: pipeline: item INCOMPLETE — 0/4 landed, 0 unspecifiable, 2 e -->
- [!] Add a depthMeter property to the game object, initialized to 0, to track descent distance  <!-- blocked: redundant depthMeter plumbing (exists via #5/#6); deferred, reversible -->
- [!] Implement a depthMeter getter that returns the current descent distance in meters  <!-- blocked: redundant depthMeter plumbing (exists via #5/#6); deferred, reversible -->
- [!] Update the depthMeter in the game loop by incrementing it based on player speed and deltaTime  <!-- blocked: redundant depthMeter plumbing (exists via #5/#6); deferred, reversible -->
- [x] Define biome transition thresholds as constants: 1000, 3000, and 5000 meters
- [x] Add a function to check current distance against thresholds and return the next biome index
- [x] Create a function to update the current biome based on distance, only when crossing a threshold
- [!] Create a function to map current distance to current biome index (0-3)  <!-- blocked: pipeline: item INCOMPLETE — 0/2 landed, 0 unspecifiable, 1 e -->
- [ ] Implement a palette lookup table with four distinct color sets for open slope, forest, dusk/night, and alpine
- [ ] Add a function to interpolate between adjacent palette bands based on depth progress
- [ ] Update the canvas background rendering to use the current biome palette at each frame
- [ ] Depth-scaled obstacle density: obstacle spawn rate rises with the current depth band.
- [ ] Biome props (original art): each band shows its own ORIGINAL decorative sprites (pines in forest, rocks/ice in alpine); original art only.
- [ ] Add a Dog class with x, y, speed, width, and height properties, initialized with random x position and fixed y position within the visible canvas
- [ ] Initialize an array of Dog instances in the game state with a fixed number of dogs at random x positions and fixed y positions
- [ ] Add a draw method to the Dog class to render the dog using Warboy's original pixel-art style on the canvas
- [ ] Update the game loop to call the draw method for each Dog instance during the PLAYING state
- [ ] Implement a Dog.update() method that moves the dog horizontally at a fixed speed, wrapping around the screen when it exits the left or right edge
- [ ] Add a Dog.draw() method that renders the dog using Warboy's original pixel-art style with a simple shape and color in the canvas
- [ ] Modify the game loop to call Dog.update() and Dog.draw() for each dog in the game's dog array
- [ ] Implement collision detection between the player and dogs, triggering a wipeout if the player hits one while not in a scoring state
- [ ] Add a 'dog' type to the obstacle array with a unique visual design using original pixel art in code
- [ ] Introduce a scoring mechanic that rewards the player for hitting a dog with a slalom maneuver, adding a style point and multiplier
- [ ] Ensure the dog disappears after crossing the screen or after a brief chase duration, preventing infinite persistence
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
