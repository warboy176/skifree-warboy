# SkiFree

A modern implementation of the classic SkiFree game with NPC skiers and autoplay functionality.

## Features

- Classic SkiFree gameplay
- NPC skiers that spawn randomly
- Autoplay mode (enable with `?demo=1`)
- Responsive canvas rendering
- Touch support for mobile devices

## How to Play

1. Press Enter or tap to start the game
2. Use arrow keys to move left and right
3. Avoid colliding with other skiers

## Autoplay Mode

To enable autoplay, visit the game with `?demo=1` in the URL:

```
http://localhost:8000/ski-free.html?demo=1
```

## Files

- `ski-free.html` - Main HTML file
- `ski-free-npc.js` - Core game logic with NPC skiers
- `ski-free-autoplay.js` - Autoplayer functionality

## Development

1. Serve the files using a local server (e.g., `python -m http.server 8000`)
2. Open `ski-free.html` in your browser

## License

MIT