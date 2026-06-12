# I Am Canadian

Suika-style merge game for the "I AM CANADIAN" presentation.

## Concept

Each tier represents a moment in Canadian identity:

1. **Red Ensign with Union Jack** — 1868, British colony
2. **Vimy Ridge** — 1917, Canada becomes a nation
3. **Canada + Korea** — 1950, Korean War (personal significance)
4. **Maple Leaf Flag** — 1965, modern Canada

Drop Red Ensigns; same flags merge into the next era. When the Maple Leaf forms, "I am Canadian" is revealed.

## Controls

- **Space** — drop a Red Ensign at current pointer position (or center)
- **Click** — drop at clicked position
- **↻ button** (top-right) — reset

## Deploy to GitHub Pages

1. Create a new repo (e.g. `i-am-canadian`)
2. Upload all files (preserve folder structure — `assets/` must contain the 4 SVGs)
3. Repo Settings → Pages → Source: `main` branch, `/` (root)
4. Your game will be live at `https://<your-username>.github.io/i-am-canadian/`

## Local Testing

Open `index.html` directly in a browser. If sprites don't show due to file:// restrictions, run a quick server:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Presentation Tips

- Total drops to reach Maple Leaf: **8 Red Ensigns** (2 → Vimy, 4 → Canada+Korea, 8 → Maple Leaf)
- Drop pace controls narration: drop 2, talk about that era, drop 2 more, etc.
- Era label appears briefly when each new tier forms — syncs with your narration
- Focus on eye contact; you only need Space to drop, no need to look at screen constantly

## File Structure

```
.
├── index.html
├── style.css
├── game.js
└── assets/
    ├── tier1-red-ensign.svg
    ├── tier2-vimy.svg
    ├── tier3-canada-korea.svg
    └── tier4-maple-leaf.svg
```
