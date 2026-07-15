# Pull-Cord Lamp Toggle

A hanging pendant lamp with a draggable pull-chain. Drag the bead down past
the threshold (or just tap/click it, or focus + Enter) to switch the lamp
on — the shade lights up lime, a soft glow washes the background, and the
chain snaps back with a little elastic bounce.

Vanilla HTML / CSS / JS, no dependencies.

## Files
- `index.html` — structure
- `style.css` — dark glass card, lamp, glow states
- `script.js` — drag physics + toggle logic

## Customize
- Swap `--lime` in `style.css` for a different accent color.
- `REST_HEIGHT`, `MAX_PULL`, `TOGGLE_THRESHOLD` in `script.js` control how
  far the cord hangs and how far it needs to be pulled.
- Hook `toggle()` up to your own dark/light mode logic if you want the
  lamp to actually drive your site's theme instead of just its own state.

Respects `prefers-reduced-motion`. Bead is a real `<button>`, so it's
keyboard accessible out of the box.

---
First draft generated with Claude AI, customized and crafted by Storymint Studio.
