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
- [!] Add biome state tracking to the game object with initial value 'open_slope'  <!-- blocked: pipeline: item INCOMPLETE — 0/2 landed, 0 unspecifiable, 1 e -->
- [!] Create a function to update CSS custom properties based on current biome, using Warboy's original color palette <!-- blocked: biome/terrain cluster unbuildable by the current coder (~5h churn, threshold-tracking+palette+background coordination beyond contextless single-function gen); deferred by maintenance to rotate to buildable features. Reopen when biome is tackled (hand-build or richer coder context). -->
- [!] Extend the game loop to call the palette update function every frame if biome has changed <!-- blocked: biome/terrain cluster unbuildable by the current coder (~5h churn, threshold-tracking+palette+background coordination beyond contextless single-function gen); deferred by maintenance to rotate to buildable features. Reopen when biome is tackled (hand-build or richer coder context). -->
- [!] Define biome transition conditions based on player distance traveled, triggering palette updates <!-- blocked: biome/terrain cluster unbuildable by the current coder (~5h churn, threshold-tracking+palette+background coordination beyond contextless single-function gen); deferred by maintenance to rotate to buildable features. Reopen when biome is tackled (hand-build or richer coder context). -->
- [!] Create a function to adjust obstacle spawn density per biome, scaling frequency based on depth and current biome <!-- blocked: biome/terrain cluster unbuildable by the current coder (~5h churn, threshold-tracking+palette+background coordination beyond contextless single-function gen); deferred by maintenance to rotate to buildable features. Reopen when biome is tackled (hand-build or richer coder context). -->
- [!] Add a function to render a subtle background layer (e.g., distant trees, stars, fog) that changes with biome, using Warboy's original code-drawn art <!-- blocked: biome/terrain cluster unbuildable by the current coder (~5h churn, threshold-tracking+palette+background coordination beyond contextless single-function gen); deferred by maintenance to rotate to buildable features. Reopen when biome is tackled (hand-build or richer coder context). -->
- [!] Ensure the game state has a shared `npcs` array initialized as an empty array  <!-- blocked: pipeline: item INCOMPLETE — 0/2 landed, 0 unspecifiable, 1 e -->
- [!] Add a `npcs` array initialized as empty in the game state  <!-- blocked: pipeline: item INCOMPLETE — 0/2 landed, 0 unspecifiable, 1 e -->
- [x] Add function initDogs() that sets game.dogs to a new empty array (separate from game.npcSkiers), and wire a call to it where the game state is initialized at start
- [x] Add a new array game.dogs = [] to initialize the dog collection in the game state setup  <!-- hand-built (rung-3 validation): chase + slow-on-contact, gate PASS -->
- [x] Create a function spawnDog() that adds a new dog object with random x, y set to -NPC_SKIER_HEIGHT, and dead: false to game.dogs only when game.state is PLAYING  <!-- hand-built (rung-3 validation): chase + slow-on-contact, gate PASS -->
- [x] Add a dog spawn timer that activates when game state is PLAYING  <!-- hand-built (rung-3 validation): chase + slow-on-contact, gate PASS -->
- [x] Implement spawnDog() to create a new Dog instance at a random x position on the slope  <!-- hand-built (rung-3 validation): chase + slow-on-contact, gate PASS -->
- [x] Ensure spawnDog() only triggers during PLAYING state and respects the timer interval  <!-- hand-built (rung-3 validation): chase + slow-on-contact, gate PASS -->
- [x] Add function updateDogs() that moves each dog in game.dogs down-slope at NPC_SKIER_SPEED and steers its x toward the player x each frame to chase; wire it into the update loop  <!-- hand-built (rung-3 validation): chase + slow-on-contact, gate PASS -->
- [x] Add function drawDogs() that draws each dog in game.dogs as an ORIGINAL code-drawn dog shape and palette, distinct from the skier; wire it into the render path  <!-- hand-built (rung-3 validation): chase + slow-on-contact, gate PASS -->
- [x] Add function checkDogCollision() that, on player overlap with a dog in game.dogs, briefly SLOWS the player with a short speed penalty (not a hard crash) then marks the dog dead; wire it into the update loop  <!-- hand-built (rung-3 validation): chase + slow-on-contact, gate PASS -->
- [x] Add drone spawn logic that generates drones at random intervals above the player's current y-position  <!-- hand-built (rung-3 validation): chase + slow-on-contact, gate PASS -->
- [x] Implement drone movement: horizontally track the player with a slow, smooth offset based on distance  <!-- hand-built (rung-3 validation): chase + slow-on-contact, gate PASS -->
- [x] Add drone collision detection with the player, triggering a crash state on contact  <!-- hand-built (rung-3 validation): chase + slow-on-contact, gate PASS -->
- [x] Draw the drone using original pixel-art style: a small, stylized flying machine with rotating propellers  <!-- hand-built (rung-3 validation): chase + slow-on-contact, gate PASS -->
- [!] Add a combo counter that increments when the player slaloms close to or crashes through NPCs, resetting on collision with trees or oil slicks  <!-- blocked: pipeline: item INCOMPLETE — 2/4 landed, 0 unspecifiable, 1 e -->
- [x] Add a function to detect when the player is within 15px horizontally of any NPC skier during their pass
- [!] Add a function to award style points only when the player is within 15px of an NPC skier and both are moving forward <!-- blocked: scoring cluster (combo/style/HUD wired across collision events + loop) - multi-touchpoint, insert-only-coder ceiling. Deferred to reach the single-function items; reopen via hand-build. -->
- [!] Add crash-through points when the player's collision with an NPC triggers a hit, with higher points for faster impact speeds <!-- blocked: scoring cluster (combo/style/HUD wired across collision events + loop) - multi-touchpoint, insert-only-coder ceiling. Deferred to reach the single-function items; reopen via hand-build. -->
- [!] Display the current combo multiplier on the HUD, updating in real time as the player chains successful style actions <!-- blocked: scoring cluster (combo/style/HUD wired across collision events + loop) - multi-touchpoint, insert-only-coder ceiling. Deferred to reach the single-function items; reopen via hand-build. -->
- [!] Render the total score and combo multiplier in the top-left corner of the HUD, with the combo shown as a glowing 'xN' indicator <!-- blocked: scoring cluster (combo/style/HUD wired across collision events + loop) - multi-touchpoint, insert-only-coder ceiling. Deferred to reach the single-function items; reopen via hand-build. -->
- [!] Sound: minimal WebAudio SFX (jump, land, crash, score, chase) synthesized in code (no files); `M` mutes; muted state persists in localStorage. <!-- blocked: multi-touchpoint feature (state+logic+HUD/loop wiring across several sites) exceeds the insert-only coder. Deferred by maintenance to ship single-function items; reopen via hand-build or a fine-tuned coder. -->
- [!] Mobile controls: on touch devices, two translucent steer zones + a jump button; prevent page scroll/zoom while playing. <!-- blocked: multi-touchpoint feature (state+logic+HUD/loop wiring across several sites) exceeds the insert-only coder. Deferred by maintenance to ship single-function items; reopen via hand-build or a fine-tuned coder. -->

## Phase 3 — Depth & identity
- [x] Coins / collectibles: pickups on the slope that add to score; a light risk/reward line to chase.  <!-- hand-built (rung-3 validation): chase + slow-on-contact, gate PASS -->
- [x] Speed boosts: boost pads/pickups that briefly increase speed (and risk); clear visual feedback.  <!-- hand-built (rung-3 validation): chase + slow-on-contact, gate PASS -->
- [x] High-jump ramps: special ramps that launch bigger air for bigger trick scores.
- [!] Add a skin selection menu to the start screen with three original Warboy-designed player art variants drawn in code using only the existing canvas context  <!-- blocked: pipeline: item INCOMPLETE — 0/4 landed, 0 unspecifiable, 2 e -->
- [!] Implement logic to store and switch between selected skin variants using a simple state variable in the game object  <!-- blocked: pipeline: item INCOMPLETE — 1/6 landed, 0 unspecifiable, 2 e -->
- [!] Update the player's visual representation on start screen and during gameplay based on the selected skin variant  <!-- blocked: pipeline: item INCOMPLETE — 0/2 landed, 0 unspecifiable, 1 e -->
- [x] Save the selected skin index to localStorage when a skin is chosen
- [!] Load the saved skin index from localStorage and apply it at game start  <!-- blocked: pipeline: item INCOMPLETE — 0/2 landed, 0 unspecifiable, 1 e -->
- [!] Add a new player skin selection state that stores the currently selected skin index  <!-- blocked: pipeline: item INCOMPLETE — 0/4 landed, 0 unspecifiable, 2 e -->
- [!] Modify the player's draw function to use the selected skin's original art instead of the default character  <!-- blocked: pipeline: item INCOMPLETE — 0/2 landed, 0 unspecifiable, 1 e -->
- [!] Ensure the selected skin is persistently applied across game restarts and maintained in the game state  <!-- blocked: pipeline: item INCOMPLETE — 0/2 landed, 0 unspecifiable, 1 e -->
- [x] Add a new `skin` property to the game object, initialized to 'default' for the existing art
- [!] Create a `renderSkin` function that maps skin names to original pixel-art drawing logic using only Warboy's own code  <!-- blocked: pipeline: item INCOMPLETE — 0/2 landed, 0 unspecifiable, 1 e -->
- [x] Modify the `drawPlayer` function to use the current skin's art via `renderSkin` instead of hardcoded colors
- [!] Update the `drawNPCSkier` function to use the current skin's art via `renderSkin` instead of hardcoded colors  <!-- blocked: pipeline: item INCOMPLETE — 0/2 landed, 0 unspecifiable, 1 e -->
- [!] Ensure the `renderSkin` function is called only when rendering, and never overrides existing game state or logic  <!-- blocked: pipeline: item INCOMPLETE — 0/4 landed, 0 unspecifiable, 2 e -->
- [x] Add a VERSION constant set to 'v0.x' in the game's global scope
- [x] Add a changelog array to the game state, initialized as an empty array
- [!] After each game restart, push a new changelog entry with the current date and version string  <!-- blocked: pipeline: item INCOMPLETE — 0/2 landed, 0 unspecifiable, 1 e -->
- [x] Update the changelog entry to include the player's score and distance at game end
- [!] Ensure the changelog array only grows and never resets during a single play session  <!-- blocked: pipeline: item INCOMPLETE — 0/4 landed, 0 unspecifiable, 2 e -->
- [!] Implement a function to update CHANGELOG.md with the current version and timestamp  <!-- blocked: pipeline NOT started: reasoner produced no valid single-func -->
- [!] Add a HUD display for the VERSION string using the constant  <!-- blocked: pipeline: item INCOMPLETE — 0/2 landed, 0 unspecifiable, 1 e -->
- [!] Ensure the changelog is updated whenever the VERSION constant changes  <!-- blocked: pipeline NOT started: reasoner decompose failed: TimeoutErro -->
- [!] Seeded runs: `?seed=<n>` makes terrain generation deterministic (share a course); show the seed on the results screen.  <!-- blocked: pipeline NOT started: reasoner decompose failed: TimeoutErro -->
- [!] High-score initials: the local board records three-letter initials with an arcade-style entry screen. <!-- blocked: multi-touchpoint feature (state+logic+HUD/loop wiring across several sites) exceeds the insert-only coder. Deferred by maintenance to ship single-function items; reopen via hand-build or a fine-tuned coder. -->
- [!] Leaderboard polish: a persistent top-scores board with dates; groundwork for shareable/daily seeds. <!-- blocked: multi-touchpoint feature (state+logic+HUD/loop wiring across several sites) exceeds the insert-only coder. Deferred by maintenance to ship single-function items; reopen via hand-build or a fine-tuned coder. -->
- [!] Reduced motion: honor `prefers-reduced-motion` by damping screen shake and particle bursts.  <!-- blocked: pipeline NOT started: reasoner decompose failed: TimeoutErro -->
- [!] Performance: pool/recycle obstacle objects and cap the live count so long runs stay at 60fps on low-end devices. <!-- blocked: multi-touchpoint feature (state+logic+HUD/loop wiring across several sites) exceeds the insert-only coder. Deferred by maintenance to ship single-function items; reopen via hand-build or a fine-tuned coder. -->

- [!] Add original Warboy-designed chase antagonist creature with unique movement pattern and visual style  <!-- blocked: pipeline: item INCOMPLETE — 0/6 landed, 0 unspecifiable, 3 e -->
- [ ] Implement dynamic terrain biomes (forest → night → alpine) that transition as player descends
- [ ] Introduce style-based scoring with multipliers for slaloming near or crashing through NPCs
- [ ] Design and integrate original unlockable skins and character variants using code-drawn art
