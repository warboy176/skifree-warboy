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
- [!] Initialize an array to track active NPC skiers in the game state  <!-- blocked: pipeline: item INCOMPLETE — 0/2 landed, 0 unspecifiable, 1 e -->
- [!] Create a function to spawn a new NPC skier at a random x-position with a fixed vertical spacing from the last one  <!-- blocked: pipeline: item INCOMPLETE — 0/3 landed, 0 unspecifiable, 2 e -->
- [!] Add a timer to trigger NPC skier spawning at random intervals between 1.5 and 3 seconds  <!-- blocked: pipeline: item INCOMPLETE — 0/3 landed, 0 unspecifiable, 2 e -->
- [!] Ensure new skiers are only spawned during gameplay and not in intro or game over states  <!-- blocked: pipeline: item INCOMPLETE — 0/4 landed, 0 unspecifiable, 2 e -->
- [!] Add NPC skier movement that updates their y-position based on a fixed speed relative to the player's scroll rate  <!-- blocked: pipeline: item INCOMPLETE — 1/3 landed, 0 unspecifiable, 1 e -->
- [!] Ensure NPC skiers are drawn at their correct screen position relative to the scrolling slope, using the player's vertical offset  <!-- blocked: pipeline: item INCOMPLETE — 0/4 landed, 0 unspecifiable, 3 e -->
- [!] Draw each NPC skier using Warboy's original pixel-art style with unique, hand-coded shapes and colors in the canvas context  <!-- blocked: pipeline: item INCOMPLETE — 1/5 landed, 0 unspecifiable, 2 e -->
- [!] Ensure NPC skiers are rendered at their correct y-position relative to the scrolling slope, updating their vertical position each frame based on game speed  <!-- blocked: pipeline: item INCOMPLETE — 0/4 landed, 0 unspecifiable, 2 e -->
- [x] Add collision detection between the player and NPC skiers that triggers a crash only on direct overlap
- [!] Add a configurable collision margin of 5 pixels to the player's hitbox in the collision detection logic <!-- blocked: depends on the NPC/collision system, which was rolled back and is not yet buildable (coder keeps inventing laneX); deferred by maintenance to unblock forward progress on independent features. Reopen when the NPC foundation lands under the hardened gate. -->
- [!] Modify the NPC skier collision check to use the 5-pixel margin instead of direct pixel overlap <!-- blocked: depends on the NPC/collision system, which was rolled back and is not yet buildable (coder keeps inventing laneX); deferred by maintenance to unblock forward progress on independent features. Reopen when the NPC foundation lands under the hardened gate. -->
- [!] Modify the player's collision response to permit movement through NPC skiers when within the threshold, preserving momentum and direction <!-- blocked: depends on the NPC/collision system, which was rolled back and is not yet buildable (coder keeps inventing laneX); deferred by maintenance to unblock forward progress on independent features. Reopen when the NPC foundation lands under the hardened gate. -->
- [!] Chase antagonist: an ORIGINAL creature of Warboy's own design appears if the player dawdles / after a distance, and pursues — catching you ends the run. Original art only.  <!-- blocked: pipeline: item INCOMPLETE — 0/6 landed, 0 unspecifiable, 3 e -->
- [!] Tricks & air: launching off a jump/mogul gives air time and a simple trick (rotation/grab) that awards style points on a clean landing.  <!-- blocked: pipeline NOT started: /mnt/warboy/.mission_repos/skifree-war -->
- [x] Add 'PAUSED' to the GameState enum and initialize game.state as GameState.PAUSED when the game starts
- [!] Add a new state 'PAUSED' to the GameState enum and initialize it in the game state object  <!-- blocked: pipeline: item INCOMPLETE — 0/2 landed, 0 unspecifiable, 1 e -->
- [x] Create a function to toggle between GameState.PLAYING and GameState.PAUSED when the 'P' key is pressed
- [!] Integrate the pause toggle function into the game loop's input handling, ensuring it only triggers in PLAYING state  <!-- blocked: pipeline: item INCOMPLETE — 0/2 landed, 1 unspecifiable, 1 e -->
- [!] Update the game loop to halt all updates and rendering when in PAUSED state, preserving current frame  <!-- blocked: pipeline NOT started: reasoner produced no valid single-func -->
- [x] Add visual feedback in the UI: display a 'PAUSED' overlay or status message when paused, visible only during PAUSED state
- [!] Pause the game loop and input processing when state is PAUSED, resuming on toggle  <!-- blocked: pipeline NOT started: reasoner produced no valid single-func -->
- [!] Display a 'PAUSED' overlay on the canvas with a clear visual indicator and instructions to press 'P' to resume  <!-- blocked: pipeline: item INCOMPLETE — 0/2 landed, 0 unspecifiable, 1 e -->
- [x] Implement a key handler for 'P' that toggles between PLAYING and PAUSED states
- [!] Modify the game loop to skip updates and rendering when in PAUSED state  <!-- blocked: pipeline: item INCOMPLETE — 0/2 landed, 0 unspecifiable, 1 e -->
- [!] Draw a dimmed 'PAUSED' overlay on top of the canvas when paused, using original art style  <!-- blocked: pipeline: item INCOMPLETE — 0/2 landed, 0 unspecifiable, 1 e -->

## Phase 2 — The living slope
- [x] Initialize a global biome state variable set to 'slope' at game start
- [!] Add depth threshold checks in the game loop that update biome state at 1000m, 2000m, and 3000m distances  <!-- blocked: pipeline: item INCOMPLETE — 0/4 landed, 0 unspecifiable, 2 e -->
- [!] Create a function to trigger biome-specific visual changes based on current biome state  <!-- blocked: pipeline: item INCOMPLETE — 0/4 landed, 1 unspecifiable, 2 e -->
- [!] Ensure biome transitions are only applied once per threshold and do not repeat  <!-- blocked: pipeline: item INCOMPLETE — 0/4 landed, 1 unspecifiable, 2 e -->
- [ ] Add biome state tracking to the game object with initial value 'open_slope'
- [ ] Create a function to update CSS custom properties based on current biome, using Warboy's original color palette
- [ ] Extend the game loop to call the palette update function every frame if biome has changed
- [ ] Define biome transition conditions based on player distance traveled, triggering palette updates
- [ ] Create a function to adjust obstacle spawn density per biome, scaling frequency based on depth and current biome
- [ ] Add a function to render a subtle background layer (e.g., distant trees, stars, fog) that changes with biome, using Warboy's original code-drawn art
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
