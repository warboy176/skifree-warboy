# Changelog
- Increment depthMeter by METERS_PER_PIXEL multiplied by the player's vertical speed each frame during PLAYING state (initDepthMeter, updateDepthMeter)
- Add a depthMeter property to the game object initialized to 0 (initGameDepthMeter)
- Pause: `P` toggles a dimmed "PAUSED" overlay; the loop must not advance while paused. (initPauseState, initPauseState, drawPausedOverlay, handlePauseInput)
- Tricks & air: launching off a jump/mogul gives air time and a simple trick (rotation/grab) that awards style points on a clean landing. (initTrickSystem, handleTrickLaunch, updateTrickSystem)
- Chase antagonist: an ORIGINAL creature of Warboy's own design appears if the player dawdles / after a distance, and pursues — catching you ends the run. Original art only. (initWarboyChase, handleWarboyChaseCollision)
- Other skiers: NPC skiers share the slope, carving their own lines; the player can weave around (or into) them. (initNPCs, spawnNPCs, handleNPCCollisions)
- Added ski-lift/lodge intro screen with skippable functionality.
- Added achievements system with Fallout-style unlock popups, tracking lifetime counters in localStorage and displaying witty unlock messages mid-run.
- Added auto-player functionality behind the `?demo=1` URL flag that starts runs, dodges deadly obstacles, jumps drones, and restarts after game-over.
